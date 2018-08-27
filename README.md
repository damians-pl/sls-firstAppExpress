# First application in serverless in Lambda AWS

### Step 1.
First we create empty project with `Hello`

```bash
$ mkdir sls-firstAppExpress && cd sls-firstAppExpress
$ npm init -f
$ npm install --save express serverless-http
```

### Step 2.

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

### Step 3.

```bash
$ sls deploy
```

Return:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (683.66 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress..........................................
Serverless: Stack update finished...

Service Information
service: sls-firstAppExpress
stage: dev
region: eu-west-1
stack: sls-firstAppExpress-dev

api keys:
  None
  
endpoints:
  ANY - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/
  ANY - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/{proxy+}

functions:
  app: sls-firstAppExpress-dev-app
```

Run in your browser:
`https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/`
