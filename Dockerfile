FROM node:18.19.1-alpine

USER root
RUN mkdir /home/node/front-invest
WORKDIR /home/node/front-invest
RUN npm install -g @quasar/cli
RUN npm i create-quasar

# VOLUME [ "/home/node/app" ]

CMD /bin/sh