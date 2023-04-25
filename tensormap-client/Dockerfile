# Using a Node.js base image
FROM node:latest

# Setting the working directory in the container
WORKDIR /tensormap-client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port for the application to run
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
