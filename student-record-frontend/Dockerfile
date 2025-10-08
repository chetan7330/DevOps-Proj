# Use official lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Expose port your app runs on (adjust if different)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
