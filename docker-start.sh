#!/bin/bash
source ~/.bashrc

npm run build

cp -a /app/website/build/. /usr/share/nginx/html
nginx -g 'daemon off;'