FROM nginx:1.21.1-alpine
EXPOSE 80
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY /src /usr/share/nginx/html