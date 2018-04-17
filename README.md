# uport-email-verification
building a flow to allow uPort users to verify their email address: https://github.com/uport-project/uport-verify/issues/1

```
$ git clone git@github.com:bakaoh/uport-email-verification.git
$ cd uport-email-verification
$ npm install
$ cd client
$ npm install
$ cd ..
$ npm run dev
```

## Deploy serverless
Set Environment variables `PORT`, `APP_NAME`, `ADDRESS`, `PRIVATE_KEY`, `EMAIL_USER`, `EMAIL_PASS` in `serverless.yml`

```
$ npm install -g serverless
$ serverless deploy
```