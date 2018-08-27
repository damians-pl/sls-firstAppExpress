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


## Build routes
Now we change project to new routes different methods.


### Step 1.
Replace current selection _functions_ in _serverless.yml_
```yaml
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
  fun:
    handler: fun/fun.handler
    events:
      - http:
          path: 'fun/{proxy+}'
          method: GET
          cors: true
      - http:
          path: 'fun/'
          method: POST
          cors: true
      - http:
          path: 'fun/'
          method: PUT
          cors: true
      - http:
          path: 'fun/{proxy+}'
          method: DELETE
          cors: true
 ```
 
 
### Step 2.
 New dir and file ex. _/fun/fun.js_ with code:
 ```js
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json({ strict: false }));


// Method GET
app.get('/fun/:proxy', function (req, res) {

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ req.params.proxy +'</b>');
});


// Method POST
app.post('/fun', function (req, res) {
    const data = req.body;

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ JSON.stringify(data, null, 2) +'</b>');
});


// Method PUT
app.put('/fun', function (req, res) {
    const data = req.body;

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ JSON.stringify(data, null, 2) +'</b>');
});


// Method DELETE
app.delete('/fun/:proxy', function (req, res) {

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ req.params.proxy +'</b>');
});


module.exports.handler = serverless(app);
```
OR

Use commit: 
[Features-1](https://github.com/damians-pl/sls-firstAppExpress/commit/9c612cc060d949b8bf2503a0cb50d253c767b757)

### Step 3.

```bash
$ sls deploy
```
Then return:

```bash
(...)
endpoints:
  ANY - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/
  ANY - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/{proxy+}
  GET - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun/{proxy+}
  POST - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun
  PUT - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun
  DELETE - https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun/{proxy+}
functions:
  app: sls-firstAppExpress-dev-app
  fun: sls-firstAppExpress-dev-fun

```

### Step 4.
Testing:

```bash
$ curl -H "Content-Type: application/json" -X GET https://XXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun/FooBar
$ curl -H "Content-Type: application/json" -X POST https://XXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun -d "{\"Foo\": \"bar\"}"
$ curl -H "Content-Type: application/json" -X PUT https://XXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun -d "{\"Foo\": \"bar\"}"
$ curl -H "Content-Type: application/json" -X DELETE https://XXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/fun/FooBar
```
