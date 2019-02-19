FROM node:8.15.0-jessie

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY "@types/*" "./@types/"
COPY .babelrc ./
COPY webpack.config.js ./
COPY jest/* ./jest/

RUN npm i

EXPOSE 3000
