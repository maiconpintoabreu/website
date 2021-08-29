FROM node:10-alpine
RUN mkdir /opt/rpg-backend
WORKDIR /opt/rpg-backend
COPY package.json /opt/rpg-backend/
RUN npm install
EXPOSE 80 443
COPY . /opt/rpg-backend

CMD [ "node", "index.js" ]
