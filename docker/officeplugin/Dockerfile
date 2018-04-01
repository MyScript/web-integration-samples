FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery/word-add-in-sample /usr/share/nginx/html
COPY *.sh /

ENTRYPOINT ["/createIndexFile.sh"]

EXPOSE 80

