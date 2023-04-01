FROM node:18-alpine

WORKDIR /usr/s3-migration/app

COPY package*.json ./

RUN npm install

COPY . .