# step 1: build the react app
FROM node:latest as builder
# set working directory
WORKDIR /app
# copy package.json
COPY package*.json ./
# install dependencies
RUN npm install
# copy the source code
COPY . .
# build the app
RUN npm run build
