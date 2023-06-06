FROM node:16

WORKDIR  /app

COPY . /app

RUN npm install 

EXPOSE 5000

ENV DB_USER=admin
ENV DB_PASSWORD=Ra7878782
ENV DB_HOST=naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com
ENV DB_DATABASE=NaturaliStone
ENV DB_PORT=3306

COPY . /config.js

CMD ["npm", "run", "serve"]

