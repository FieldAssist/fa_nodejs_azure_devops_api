import { runApp } from "./event";

const express = require('express');
const bodyParser = require('body-parser');
const marked = require('marked');
const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/generate', async (req: any, res: any) => {
  try {
    let org = req.query.org;
    let token = req.query.token;
    let iterationPaths: string[] = JSON.parse(req.query.iterationPaths);

    if (!org || !token || !iterationPaths) {
      res.status(400).send('org, token, iterationPaths cannot be null/empty!');
      return;
    }

    let orgUrl = `https://dev.azure.com/${ org }`;
    const content = await runApp(orgUrl, token, iterationPaths);

    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send(e?.toString());
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${ port }`)
})