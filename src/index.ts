import { getWorkItem, getWorkItemApi, runApp } from "./event";
import { handleGit } from "./git";
import { getEpicMarkdownBody } from "./test";
import * as fs from "fs";


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const marked = require('marked');
const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
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

app.get('/generator/epic', async (req: any, res: any) => {
  try {

    const orgUrl = "https://dev.azure.com/flick2know";
    const azToken = req.query.azToken;
    const ghToken = req.query.ghToken;
    const epicId = req.query.epicId;

    if (!ghToken || !epicId || !azToken) {
      res.status(400).send('ghToken, epicId, azToken cannot be null/empty!');
      return;
    }
    let workItemTrackingApi = await getWorkItemApi(orgUrl, azToken);

    const epic = await getWorkItem(workItemTrackingApi, parseInt(epicId));
    const epicMarkdown = await getEpicMarkdownBody(epic, orgUrl, azToken);
    console.log('Generated markdown content successfully!');

    fs.rmdirSync("./fa_vuejs_azure_api_dashboard", { recursive: true });

    const commitMsg = `Update from FieldAssist/fa_vuejs_azure_api_dashboard for Epic ${ epic.id }`;
    await handleGit(ghToken, epicMarkdown.title, epicMarkdown.content, commitMsg);
    res.send('Successfully pushed changes.');
  } catch (e) {
    console.error(e);
    res.status(500).send(e?.toString());
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${ port }`)
})