FROM node:7

WORKDIR /app

COPY package*.json ./

RUN npm install

ADD . /app

COPY . .

EXPOSE 8080

ENV NAME World

CMD ["ng", "serve"]

