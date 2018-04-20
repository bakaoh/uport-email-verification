const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

const uport = require('uport');
const EmailVerifier = require('uport-verify-email').default;

const port = process.env.PORT || 5000;

// uport app config
const appName = process.env.APP_NAME || 'Email Verification';
const address = process.env.ADDRESS || '2od4Re9CL92phRUoAhv1LFcFkx2B9UAin92';
const privateKey = process.env.PRIVATE_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJzdWIiOi...';

// email config
const emailUser = process.env.EMAIL_USER || 'uportemailverify@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'abc123456';

// set up the uport app credentials
const uPortApp = new uport.Credentials({
    appName: appName,
    address: address,
    signer: new uport.SimpleSigner(privateKey)
});

// set up the email account for sending verification QRs
// pass the uport app credentials
const verifier = new EmailVerifier({
    credentials: uPortApp,
    callbackUrl: 'https://api.uport.me/verify',
    user: emailUser,
    pass: emailPass,
    service: 'gmail',
    confirmationSubject: 'uPort Identity ',
    confirmationTemplate: qr => `<html>...${qr}...</html>`,
    attestationSubject: 'uPort Email Attestation',
    attestationTemplate: qr => `<html>...${qr}...</html>`,
    customRequestParams: {},
    qrFolder: '/tmp/'
});

app.use(bodyParser.json({ strict: false }));

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    const allowHeader = req.header("Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Headers", allowHeader ? allowHeader : "*");
    res.send(200);
});

app.post('/register', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    // endpoint reads email from request params
    const email = req.body.email;

    // send an email to user containing the request QR and return the token
    const requestToken = verifier.receive(email);

    res.json({ msg: 'success' });
})

app.post('/verify', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    // endpoint reads access token from POST data
    const accessToken = req.body.access_token;

    // sign an attestation claiming control of the email
    // by default, push the attestation and send an email with QR to download
    const identity = verifier.verify(accessToken);

    res.json({ msg: 'success' });
})

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports.handler = serverless(app);