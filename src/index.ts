import { genSprintNotes } from "./event";
import * as fs from "fs";
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import { v1router } from "./v1.router";
import helmet from "helmet";
import { AppError } from "./utils/appError";
import { globalError } from "./controllers/error.controller";

const app = express();
const port = process.env.PORT ?? 3000;

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1', v1router);
app.use('/', v1router);

/**
 * @deprecated Use generator route
 */
app.get('/generate', async (req: any, res: any) => {
  try {
    let org = req.query.org;
    let token = req.query.token;

    if (!org || !token || !req.query.iterationPaths) {
      res.status(400).send('org, token, iterationPaths cannot be null/empty!');
      return;
    }

    let iterationPaths: string[] = JSON.parse(req.query.iterationPaths);

    let orgUrl = `https://dev.azure.com/${ org }`;
    const content = await genSprintNotes(orgUrl, token, iterationPaths,'Sprint 000');

    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send(e?.toString());
  }
})

/**
 * @deprecated Use generator route
 */
app.get('/clear', async (req: any, res: any) => {
  try {
    fs.rmdirSync("./fa_vuepress_product_docs", { recursive: true });
    res.send('Cleared ./fa_vuepress_product_docs dir');
  } catch (e) {
    console.error(e);
    res.status(500).send(e?.toString());
  }
})

// handle undefined Routes
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'Not found', 'undefined route');
  res.status(404).send(err);
});

app.use(globalError);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${ port }`)
})
