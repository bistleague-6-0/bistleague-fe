# Use a Node.js base image for building
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install only production dependencies
RUN  npm install --omit=dev

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the Next.js default port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV production

# Start the Next.js application
CMD ["npm", "start"]