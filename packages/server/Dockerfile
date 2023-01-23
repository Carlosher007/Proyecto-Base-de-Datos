FROM node:18-alpine3.15

WORKDIR /server

COPY ./package.json /server

RUN yarn

COPY . .

CMD ["yarn","start"]


