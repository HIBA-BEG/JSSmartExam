FROM node:20.17.0

WORKDIR /App

COPY package.json package-lock.json  ./

COPY . . 

RUN npm install

EXPOSE 3000

CMD ["node","server.js"]


