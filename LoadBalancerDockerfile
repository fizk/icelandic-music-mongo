FROM httpd:2.4

RUN apt-get update \
 && apt-get install -y  vim

COPY ./assets/httpd/httpd.conf /usr/local/apache2/conf/httpd.conf
