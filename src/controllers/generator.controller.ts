import { genSprintNotes, getWorkItem, getWorkItemApi } from "../event";
import { getEpicMarkdownBody } from "../test";
import fs from "fs";
import { handleGit } from "../git";

export const sprint = async (req: any, res: any) => {
  try {
    let org = req.query.org;
    let token = req.query.token;

    if (!org || !token || !req.query.iterationPaths) {
      res.status(400).send('org, token, iterationPaths cannot be null/empty!');
      return;
    }

    let iterationPaths: string[] = JSON.parse(req.query.iterationPaths);

    let orgUrl = `https://dev.azure.com/${org}`;
    const content = await genSprintNotes(orgUrl, token, iterationPaths, "Sprint 000");

    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send(e?.toString());
  }
}

export const epic = async (req: any, res: any) => {
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

    fs.rmdirSync("./fa_vuepress_product_docs", { recursive: true });

    const commitMsg = `Update from FieldAssist/fa_vuejs_azure_api_dashboard for Epic ${epic.id}`;
    await handleGit(ghToken, epicMarkdown.title, epicMarkdown.content, commitMsg);

    fs.rmdirSync("./fa_vuepress_product_docs", { recursive: true });

    res.send('Successfully pushed changes.');
  } catch (e) {
    console.error(e);
    res.status(500).send(e?.toString());
  }
}
