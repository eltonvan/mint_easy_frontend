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
# Install Certbot and necessary packages
RUN apt-get update && \
    apt-get install -y certbot python3-certbot-nginx && \
    rm -rf /var/lib/apt/lists/*
# copy the build files to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html
# Install Certbot and necessary packages
RUN apt-get update && \
    apt-get install -y certbot python3-certbot-nginx && \
    rm -rf /var/lib/apt/lists/*
# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Set the domain for Certbot
ENV CERTBOT_DOMAIN www.mint-easy.de
# Execute the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
# copy the custom nginx configuration
<<<<<<< HEAD
COPY default.conf /etc/nginx/conf.d/default.conf
# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
# expose port 443
EXPOSE 443
=======
#COPY default.conf /etc/nginx/conf.d/default.conf
# expose ports
EXPOSE 80
EXPOSE 443

>>>>>>> reverse_server
# run nginx
CMD ["nginx", "-g", "daemon off;"]


