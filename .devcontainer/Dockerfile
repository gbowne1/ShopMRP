# psql
RUN apt-get update && apt-get install -y postgresql-client
FROM node:14-alpine3.12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "start"]

# heroku
RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
