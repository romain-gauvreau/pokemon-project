FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "package-lock.json", ".env", "./"]

RUN npm install

# Bundle app source
COPY ./src ./src

CMD npm run start
