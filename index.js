const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3002;

app.use(cookieParser());

app.use(cors());

app.get('/iframe', (req, res) => {
    res.sendFile(path.join(__dirname + "/iframe.html"));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/home.html"));
})

app.get('/firstpartycookie', (req, res) => {
    console.log('req cookies', req.cookies);

    res.cookie('notsamesite_firstparty', 'testing', {
            expires: new Date(Date.now() + 900000),
            sameSite: "none",
            secure: true,
            httpOnly: true
        })
        .send('test');
})

app.get('/thirdpartycookie', (req, res) => {
    console.log('req cookies', req.cookies);

    res.cookie('notsamesite_thirdparty', 'testing', {
            expires: new Date(Date.now() + 900000),
            sameSite: "none",
            secure: true,
            httpOnly: true
        })
        .send('test');
})

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, app)
  .listen(port, function () {
    console.log(`Example app listening on ${port} Go to https://localhost:${port}/`);
  })