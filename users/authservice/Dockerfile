# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/authservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --ignore-scripts

# Copy the app source code to the working directory
COPY . .

# Create a new non-root user and group
RUN addgroup -S myusergroup && adduser -S myuser -G myusergroup

# Change the ownership of the working directory to the newly created user
RUN chown -R myuser:myusergroup /usr/src/authservice

# Switch to the new non-root user
USER myuser

# Expose the port the app runs on
EXPOSE 8002

# Define the command to run your app
CMD ["node", "auth-service.js"]
