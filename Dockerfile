
# Set env variables here (none to worry about today)
FROM nginx

# copy instead of mount so we can give permissions as root
COPY ./website ./app/website

RUN mkdir /home/nginx && touch /home/nginx/.bashrc && chown -R nginx:nginx /home/nginx 

# we're using numeric user to match kubernetes
RUN usermod -u 9999 -d /home/nginx -s /bin/bash nginx
RUN groupmod -g 9999 nginx

RUN apt-get update && apt-get install -y curl

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker-start.sh /usr/local/bin/docker-start.sh

RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /app
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid

USER 9999

EXPOSE 8080

CMD ["bash", "/usr/local/bin/docker-start.sh"]


