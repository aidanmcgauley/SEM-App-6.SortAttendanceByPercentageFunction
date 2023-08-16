# Use Node.js 14 Alpine as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the src directory to the working directory
COPY src/ ./src/

# Expose the port your app runs on
EXPOSE 8006

# Command to run the application
CMD [ "node", "src/index.js" ]