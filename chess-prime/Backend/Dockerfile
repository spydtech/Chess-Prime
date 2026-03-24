# Use Node.js 20 Alpine with full SSL support
FROM node:20-alpine
 
# Install ca-certificates and update them
RUN apk add --no-cache ca-certificates && \
    update-ca-certificates
 
# Set working directory
WORKDIR /Backend
 
# Copy package files
COPY package*.json ./
 
# Install dependencies
RUN npm ci --only=production
 
# Copy application source
COPY . .
 
# Expose port
EXPOSE 5000
 
# Start the application
CMD ["node", "server.js"]