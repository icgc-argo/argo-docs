FROM node:11

WORKDIR /

COPY . .

# Set env variables here (none to worry about today)

RUN cd website && npm ci && npm run build

FROM nginx:alpine

COPY --from=0 /website/build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]