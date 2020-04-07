
# Set env variables here (none to worry about today)
FROM nginx

# copy instead of mount so we can give permissions as root
COPY ./website ./app/website



# we're using numeric user to match kubernetes
RUN usermod -u 9999 nginx
#RUN groupmod -g 9999 nginx

RUN apt-get update && apt-get install -y curl

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker-start.sh /usr/local/bin/docker-start.sh

RUN chown -R nginx:nginx /var/cache/nginx
RUN chown -R nginx:nginx /var/log/nginx
RUN chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid
# This loads nvm

# give permissions for NVM to work as a non root user
RUN mkdir /.npm /.nvm 
RUN echo 'export NVM_DIR="/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"'  >> /.bashrc

RUN chown -R nginx:nginx /app /.nvm /.bashrc \
    && chown -R nginx:0 /.npm
RUN chmod -R 777 /.npm /.nvm /.bashrc 
USER 9999

EXPOSE 8080

CMD ["bash", "/usr/local/bin/docker-start.sh"]


