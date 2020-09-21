FROM node:latest

WORKDIR /client

# COPY package*.json /client/

# COPY app.json /client/

COPY / /client/

RUN npm install --global expo-cli

RUN npm install

RUN npm audit fix

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD [ "expo", "start" ]
