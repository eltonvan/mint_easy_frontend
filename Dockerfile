# Use an official Node runtime as a base image
FROM node:latest as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Use a lightweight Nginx image as the final image
FROM nginx:latest

# Copy the built app from the builder stage to the Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Change the ownership of the /etc/letsencrypt directory to the nginx user
RUN chown -R nginx:nginx /etc/letsencrypt

# Expose ports
EXPOSE 80
EXPOSE 443

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]