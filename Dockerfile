FROM node:8.1.4
COPY ./build ./app
WORKDIR /app
RUN npm install -g serve
CMD serve -s . -l $PORT
