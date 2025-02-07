# Use official Node.js image as base
FROM node:18-alpine 

# Set working directory
WORKDIR /app 

# Copy package files and install dependencies
COPY package.json package-lock.json ./ 
RUN npm install --frozen-lockfile 

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Expose port (default Vite runs on 5173)
EXPOSE 5173 

# Start the application
CMD ["npm", "run", "preview"]