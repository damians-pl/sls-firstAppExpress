# First application in serverless in Lambda AWS

##Clean app
First we create empty project with `Hello`
###Step 1.

```bash
$ mkdir sls-firstAppExpress && cd sls-firstAppExpress
$ npm init -f
$ npm install --save express serverless-http
```

###Step 2.

Create new file ex. _app.js_ and add code:
```js
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello in my express application!')
});

module.exports.handler = serverless(app);
```
Create new file ex. _serverless.yml_ This is a pretty basic configuration. Put code:
```yaml
service: sls-firstAppExpress

provider:
  name: aws
  runtime: nodejs6.10
  stage: dev
  region: eu-west-1

functions:
  app:
    handler: app.handler
    events:
      - http:
          path: '/'
          method: ANY
          cors: true
      - http:
          path: '{proxy+}'
          method: ANY
          cors: true
```
OR

Use commit: 
[Initial commit](https://github.com/damians-pl/sls-firstAppExpress/commit/9c612cc060d949b8bf2503a0cb50d253c767b757)

###Step 3.

```bash
$ sls deploy
```