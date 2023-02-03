FROM node:18-alpine3.15


WORKDIR /server

COPY ./packages/server .

RUN npm install

CMD ["yarn", "dev"]