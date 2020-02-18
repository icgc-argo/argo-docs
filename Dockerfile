FROM node:11

WORKDIR /app

COPY . .

# Set env variables here (none to worry about today)

RUN cd website && npm ci && npm run build

FROM nginx:alpine
COPY --from=0 /app/website/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /var/cache/nginx
RUN chown -R nginx:nginx /var/log/nginx
RUN chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid

# we're using numeric user to match kubernetes
RUN usermod -u 1000 nginx
RUN groupmod -u 1000 nginx
USER 1000

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]