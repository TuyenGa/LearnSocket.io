FROM node:7.7.4-alpine
RUN mkdir -p /usr/src/socketio
WORKDIR /usr/src/socketio
COPY . /usr/src/socketio
EXPOSE 3000
RUN npm install
CMD ["node", "index"]