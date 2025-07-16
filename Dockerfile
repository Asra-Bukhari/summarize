# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose port and run
EXPOSE 3000
CMD ["npm", "run", "dev"]
