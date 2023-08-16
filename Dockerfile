FROM node:14-alpine
WORKDIR /usr/src/app
COPY src/ /var/www/html/
EXPOSE 8006
CMD [ "node", "src/index.js" ]
