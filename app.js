import express from 'express';
import https from 'https';
import fs from 'fs';
import { handler as ssrHandler } from './dist/server/entry.mjs';


const app = express();
app.use(express.static('dist/client/'));
app.use((req, res, next) => {
  const locals = {
    title: 'New title',
  };

  ssrHandler(req, res, next, locals);
});

const sslOptions = {
  key: fs.readFileSync('./certificate/certificate.key'),
  cert: fs.readFileSync('./certificate/engineeringsampel.crt'),
  ca: fs.readFileSync('./certificate/ca_bundle.crt'),
};

https.createServer(sslOptions, app).listen(443, () => {
  console.log('Server HTTPS berjalan di https://localhost');
});

//console.log("Server Listen ...")
//app.listen(process.env.PORT || 80);
//app.listen()