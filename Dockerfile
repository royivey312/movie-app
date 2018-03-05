FROM node:7

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

ADD . /app

COPY . .

EXPOSE 4200

ENV NAME Movie-App

RUN ng set --global warnings.versionMismatch=false

CMD ["ng", "serve", "--host", "0.0.0.0"]

