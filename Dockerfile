FROM yarnpkg/node-yarn:latest

WORKDIR /usr/src/app
RUN yarn install
