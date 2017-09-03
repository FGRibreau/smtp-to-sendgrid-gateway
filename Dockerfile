FROM node:8

EXPOSE 25


ADD package.json /app/
ADD package-lock.json /app/
ADD server.js /app/
ADD utils.js /app/

WORKDIR /app/

RUN npm install

CMD ["npm","start"]
