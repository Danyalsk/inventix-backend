FROM node:18

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --production

# COPY src src
COPY . .


ENV NODE_ENV production
CMD ["node", "server.js"]

EXPOSE 4040