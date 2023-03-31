pipeline {
    agent {
        kubernetes {
            label 'program-service-executor'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:12.6.0
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
  - name: docker
    image: docker:18-git
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
    - name: HOME
      value: /home/jenkins/agent
  - name: dind-daemon
    image: docker:18.06-dind
    securityContext:
      privileged: true
      runAsUser: 0
    volumeMounts:
    - name: docker-graph-storage
      mountPath: /var/lib/docker
  securityContext:
    runAsUser: 1000
  volumes:
  - name: docker-graph-storage
    emptyDir: {}
"""
        }
    }

    environment {
        gitHubRegistry = 'ghcr.io'
        gitHubRepo = 'icgc-argo/argo-docs'
        gitHubImageName = "${gitHubRegistry}/${gitHubRepo}"
        DEPLOY_TO_DEV = false
        PUBLISH_IMAGE = false

        commit = sh(
            returnStdout: true,
            script: 'git describe --always'
        ).trim()

        version = sh(
            returnStdout: true,
            script:
            'cat ./website/package.json | ' +
            'grep "\\"version\\":" | ' +
            'cut -d \':\' -f2 | sed -e \'s/"//\' -e \'s/",//\''
        ).trim()
        slackNotificationsUrl = credentials('JenkinsFailuresSlackChannelURL')
    }

    parameters {
        booleanParam(
            name: 'DEPLOY_TO_DEV',
            defaultValue: "${env.DEPLOY_TO_DEV}",
            description: 'Deploys your branch to argo-dev'
        )
        booleanParam(
            name: 'PUBLISH_IMAGE',
            defaultValue: "${env.PUBLISH_IMAGE ?: params.DEPLOY_TO_DEV}",
            description: 'Publishes an image with {git commit} tag'
        )
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Run test') {
            steps {
                script {
                    try {
                        sh "npm run test"
                    }catch(err){
                        echo "Tests failed"
                    }
                }
            }
        }

        stage('Builds image') {
            steps {
                container('docker') {
                    sh "docker build --network=host -f Dockerfile . -t ${gitHubImageName}:${commit}"
                }
            }
        }

        stage('Publish tag to github') {
            when {
                branch 'main'
            }
            steps {
                container('node') {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'argoGithub',
                            passwordVariable: 'GIT_PASSWORD',
                            usernameVariable: 'GIT_USERNAME'
                        ),
                    ]) {
                        script {
                            // we still want to run the platform deploy even if this fails, hence try-catch
                            try {
                                sh "git tag ${version}"
                                sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${gitHubRepo} --tags"
                                sh "curl \
                                -X POST \
                                -H 'Content-type: application/json' \
                                    --data '{ \
                                        \"text\":\"New ${gitHubRepo} published succesfully: v.${version}\
                                        \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                                    }' \
                                ${slackNotificationsUrl}"
                            } catch (err) {
                                echo 'There was an error while publishing packages'
                            }
                        }
                    }
                }
            }
        }


        stage('Publish images') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                    expression { return params.PUBLISH_IMAGE }
                }
            }
            steps {
                container('docker') {
                    withCredentials([usernamePassword(
                        credentialsId:'argoContainers',
                        passwordVariable: 'PASSWORD',
                        usernameVariable: 'USERNAME'
                    )]) {
                        sh "docker login ${gitHubRegistry} -u $USERNAME -p $PASSWORD"

                        script {
                            if (env.BRANCH_NAME ==~ 'main') { //push edge and commit tags
                                sh "docker tag ${gitHubImageName}:${commit} ${gitHubImageName}:${version}"
                                sh "docker push ${gitHubImageName}:${version}"

                                sh "docker tag ${gitHubImageName}:${commit} ${gitHubImageName}:latest"
                                sh "docker push ${gitHubImageName}:latest"
                            } else { // push commit tag
                                sh "docker tag ${gitHubImageName}:${commit} ${gitHubImageName}:${commit}"
                                sh "docker push ${gitHubImageName}:${commit}"
                            }

                            if (env.BRANCH_NAME ==~ 'develop') { // push edge tag
                                sh "docker tag ${gitHubImageName}:${commit} ${gitHubImageName}:edge"
                                sh "docker push ${gitHubImageName}:edge"
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to argo-dev') {
            when {
                anyOf {
                    branch 'develop'
                    expression { return params.DEPLOY_TO_DEV }
                }
            }
            steps {
                build(job: "/ARGO/provision/docs", parameters: [
                     [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'dev' ],
                     [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set-string image.tag=${commit}" ]
                ])
            }
        }

        stage('Deploy to argo-qa') {
            when { branch 'main' }
            steps {
                build(job: "/ARGO/provision/docs", parameters: [
                     [$class: 'StringParameterValue', name: 'AP_ARGO_ENV', value: 'qa' ],
                     [$class: 'StringParameterValue', name: 'AP_ARGS_LINE', value: "--set-string image.tag=${version}" ]
                ])
            }
        }
    }

    post {
        unsuccessful {
            // i used node   container since it has curl already
            container('node') {
                script {
                    if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'develop') {
                        sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Build Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL}) \"}' ${slackNotificationsUrl}"
                    }
                }
            }
        }
        fixed {
            container('node') {
                script {
                    if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'develop') {
                        sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Build Fixed: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL}) \"}' ${slackNotificationsUrl}"
                    }
                }
            }
        }
    }
}
