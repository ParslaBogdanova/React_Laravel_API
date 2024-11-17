FROM node:20.18.0-alpine3.19
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
