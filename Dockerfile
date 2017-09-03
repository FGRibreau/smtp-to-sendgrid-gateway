FROM node:8

EXPOSE 25

ADD package.json /usr/src/app
ADD package-lock.json /usr/src/app
ADD server.js /usr/src/app
ADD utils.js /usr/src/app

RUN npm install

CMD ["npm","start"]
