FROM nginx:1.13

RUN mkdir -p /home/ubuntu/www
WORKDIR /home/ubuntu/www
COPY . /home/ubuntu/www

COPY default.conf /etc/nginx/conf.d

ARG HOST_URL

RUN apt-get -qq update
RUN apt-get -qq -y install curl
RUN apt-get install --yes gnupg
RUN curl --silent --location https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

RUN npm i
RUN npm i gulp -g

RUN gulp env

RUN npm run build
