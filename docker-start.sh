#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc

nvm install 12.16.1
nvm use --delete-prefix 12.16.1
npm install -g envsub

cd /app/website
# grab Helm values from env and update our .env file
# Docusaurus build process means we can't just grab the process.env.$var
# We have to update our .env file which will be read by a Docusaurus plugin (dotenv plugin)

envsub .env.docker .env

npm ci && npm run build

cp -a /app/website/build/. /usr/share/nginx/html
nginx -g 'daemon off;'