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

# step 2: run the app
FROM nginx:latest
# copy the build files to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html
# copy the custom nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf
# expose port 80
EXPOSE 80
# run nginx
CMD ["nginx", "-g", "daemon off;"]


