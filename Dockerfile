FROM node:11

ENV APP_UID=9999
ENV APP_GID=9999
RUN groupmod -g $APP_GID node 
RUN usermod -u $APP_UID -g $APP_GID node
WORKDIR /app

COPY . .
RUN chown -R node /app
USER node

# Set env variables here (none to worry about today)

RUN cd website && npm ci && npm run build

FROM nginx:alpine

COPY --from=0 /website/build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]