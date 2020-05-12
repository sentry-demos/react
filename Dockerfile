FROM node:14.2.0
COPY ./build ./app
WORKDIR /app
RUN npm install -g serve
CMD serve -s . -l $PORT