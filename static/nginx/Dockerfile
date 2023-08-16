FROM nginx:1.11

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./default_prod.conf  /etc/nginx/conf.d/

VOLUME ["/data", "/etc/nginx", "/var/log/nginx"]

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]
