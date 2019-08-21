FROM nginx:1.17.3
RUN mkdir /etc/nginx/creds
EXPOSE 80 443
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY nginx/fullchain.pem /etc/nginx/creds/
COPY nginx/privkey.pem /etc/nginx/creds/
COPY nginx/fullchain.pem /etc/nginx/creds/kupping/
COPY nginx/privkey.pem /etc/nginx/creds/kupping

COPY /src /usr/share/nginx/html