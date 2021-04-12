import { getWorkItem, getWorkItemApi } from "../event";
import { getEpicMarkdownBody } from "../test";
import { handleGit } from "../git";

export async function runEpicPublish(azToken: string, ghToken: string, epicId: string): Promise<string> {
  try {
    const orgUrl = "https://dev.azure.com/flick2know";

    if (!ghToken || !epicId || !azToken) {
      throw 'ghToken, epicId, azToken cannot be null/empty!';
    }

    let workItemTrackingApi = await getWorkItemApi(orgUrl, azToken);

    const epic = await getWorkItem(workItemTrackingApi, parseInt(epicId));
    const epicMarkdown = await getEpicMarkdownBody(epic, orgUrl, azToken);
    console.log('Generated markdown content successfully!');

    const commitMsg = `Update from FieldAssist/fa_vuejs_azure_api_dashboard for Epic ${ epic.id }`;
    await handleGit(ghToken, epicMarkdown.title, epicMarkdown.content, commitMsg);
    return 'Successfully pushed changes.';
  } catch (e) {
    console.error(e);
    throw e;
  }
}