FROM node:16

WORKDIR /app

COPY . /app

ENV REACT_APP_REST=/api

RUN npm install

RUN npm i -g serve 

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]