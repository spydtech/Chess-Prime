# Use official Node.js 18 image

FROM node:18-alpine
 
# Set working directory

WORKDIR /Backend
 
# Copy package files

COPY package*.json ./
 
# Install ALL dependencies (including chess.js)

RUN npm install
 
# Copy application files

COPY . .
 
# Expose port

EXPOSE 5000
 
# Start the application

CMD ["node", "server.js"]

 
Ok
 