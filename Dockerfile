FROM node:8

EXPOSE 25


ADD package.json /app/
ADD package-lock.json /app/
ADD config.js /app/
ADD utils.js /app/
ADD server.js /app/

WORKDIR /app/

RUN npm install

CMD ["npm", "--silent", "start"]
