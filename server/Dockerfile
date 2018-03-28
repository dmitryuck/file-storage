FROM node:9.8.0

RUN mkdir -p /home/ubuntu/www
WORKDIR /home/ubuntu/www
COPY . /home/ubuntu/www

RUN npm i
RUN npm i pm2 -g
RUN npm run build

CMD ["pm2-docker", "start", "process.json"]
