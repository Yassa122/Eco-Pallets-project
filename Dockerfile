# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the source code inside the container
COPY . .

# Make port available to the world outside this container
EXPOSE 3000

# Define environment variables
ENV NODE_ENV production

# Run the app when the container launches
CMD ["npm", "run", "start:prod"]
