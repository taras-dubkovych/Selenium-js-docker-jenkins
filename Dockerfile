FROM node:18-alpine
RUN npm install -g selenium-webdriver mocha chai chromedriver mocha-junit-reporter --save-dev