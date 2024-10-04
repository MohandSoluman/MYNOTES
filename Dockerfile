
# Development stage
FROM node:20 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
CMD ["npm", "run", "dev"]





