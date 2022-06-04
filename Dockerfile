FROM nginx:stable-alpine
COPY ./dist/apps/proyecto-integrado /usr/share/nginx/html
EXPOSE 80
