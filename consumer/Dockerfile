FROM node:14-alpine


COPY ./dist /home/application/dist
COPY ./package.json /home/application/package.json
COPY ./yarn.lock /home/application/yarn.lock

WORKDIR /home/application/
RUN yarn install


WORKDIR /home/application/

EXPOSE 3000

CMD yarn start:prod