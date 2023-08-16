FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
EXPOSE 8006
CMD [ "node", "src/index.js" ]
