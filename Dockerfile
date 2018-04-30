

####
# Stage 0, based on Node.js, to build and compile Angular
###

FROM node:8.6 as node

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY ./ /app/

# Enables parameter passing into the build process
ARG env=prod

RUN npm run build -- --prod --environment $env

####
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
###

FROM nginx:1.13

# Standard Nginx webroot and .conf locations
COPY --from=node /app/dist/ /var/www/html/movie-app

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-main.conf /etc/nginx.conf
