FROM node:15.3.0-alpine3.10

WORKDIR /usr/src/app
COPY package.json .
RUN npm install

ADD . /usr/src/app
RUN npm run tsc

CMD ["npm", "start"]
EXPOSE 8080