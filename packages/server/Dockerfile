FROM node:18-alpine3.15

COPY . /server
WORKDIR /server
RUN npm install bcrypt
RUN npm install
CMD ["yarn","dev"]
