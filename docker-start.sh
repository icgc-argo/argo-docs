#!/bin/bash
whoami
id
echo 'group........'
cat /etc/group
echo 'users..............'
cat /etc/passwd
cd /
pwd
#export NVM_DIR=/.nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc

nvm install 12.16.1
nvm use --delete-prefix 12.16.1

npm install -g envsub

# grab Helm values and update our .env file
# Docusaurus build process means we can't just grab the process.env.$var
# We have to update our .env file which will be read by a Docusaurus plugin (dotenv plugin)
export ALGOLIA_INDEX=TESTING_INDEX_NAME_CIARAN ALGOLIA_API_KEY=99999999999999999999999
#echo $ALGOLIA_API_KEY $ALGOLIA_INDEX
cd /app/website
envsub .env.docker .env
echo '\ \ \'
cat .env
echo '\ \ \'
npm ci && npm run build

cp -r /app/website/build /usr/share/nginx/html
nginx -g 'daemon off;'