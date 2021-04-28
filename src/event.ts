import * as azdev from "azure-devops-node-api";
import * as wi from "azure-devops-node-api/WorkItemTrackingApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { WorkItem, WorkItemExpand } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";

export async function getWorkItemApi(orgUrl: string, token: string): Promise<wi.WorkItemTrackingApi> {
  let authHandler = azdev.getPersonalAccessTokenHandler(token);
  let connection = new azdev.WebApi(orgUrl, authHandler);
  return await connection.getWorkItemTrackingApi();
}

export async function getWorkItems(workItemTrackingApi: WorkItemTrackingApi, ids: []) {
  return await workItemTrackingApi.getWorkItems([...ids], undefined, undefined, WorkItemExpand.All);
}

export async function getWorkItem(workItemTrackingApi: WorkItemTrackingApi, id: number) {
  return await workItemTrackingApi.getWorkItem(id, undefined, undefined, WorkItemExpand.All);
}

export async function genSprintNotes(orgUrl: string, token: string, iterationPaths: string[]): Promise<string> {
  try {
    let workItemTrackingApi: wi.WorkItemTrackingApi = await getWorkItemApi(orgUrl, token);

    const query = `SELECT [System.Id], [System.Title], [System.State], [System.Description] FROM WorkItems WHERE [System.WorkItemType] = 'Product Backlog Item' AND [State] IN ('Committed','Testing','Ready for Demo','UAT','Done') AND [System.IterationPath] IN ('${ iterationPaths.join("','") }') ORDER BY [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc`;
    const backlogRefList = await workItemTrackingApi.queryByWiql({ query: query })
    const backlogIds = backlogRefList?.workItems?.map(value => value.id) ?? [];

    // @ts-ignore
    let backlogs = await getWorkItems(workItemTrackingApi, backlogIds);

    // @ts-ignore
    backlogs = backlogs.sort((a, b) => (a.fields['System.Parent'] ?? 0) - (b.fields['System.Parent'] ?? 0));

    let contentList = [];
    contentList.push("# 🔅 Sprint 000 (xy Apr - pq Apr '21)");

    for (const backlog of backlogs) {
      // @ts-ignore
      const title = backlog.fields['System.Title'];
      // @ts-ignore
      const description = backlog.fields['System.Description'];
      // @ts-ignore
      const acceptance = backlog.fields['Microsoft.VSTS.Common.AcceptanceCriteria'];

      const id = backlog.id;
      const url = backlog._links.html.href;

      let featureTitle = "";
      let featureUrl = "";

      let epicTitle = "";
      let epicId;
      let epicUrl = "";
      // @ts-ignore
      const featureId = backlog.fields['System.Parent'];
      if (featureId) {
        const feature = await workItemTrackingApi.getWorkItem(featureId ?? -1, undefined, undefined, WorkItemExpand.All);
        // @ts-ignore
        featureTitle = feature.fields['System.Title'];
        featureUrl = feature._links.html.href;
        // @ts-ignore
        epicId = feature.fields['System.Parent'];
        if (epicId) {
          const epic = await workItemTrackingApi.getWorkItem(epicId ?? -1, undefined, undefined, WorkItemExpand.All);
          // @ts-ignore
          epicTitle = epic.fields['System.Title'];
          epicUrl = epic._links.html.href;
        }
      }

      contentList.push(`## 📝 ${ title } ${ id }`);
      const linkList = [];
      if (id)
        linkList.push(`#### Backlog: [${ id }](${ url })  `);
      if (epicTitle)
        linkList.push(`#### Epic: [${ epicTitle } ${ epicId }](${ epicUrl })`)
      if (featureTitle)
        linkList.push(`#### Feature: [${ featureTitle } ${ featureId }](${ featureUrl })`);
      if (linkList.length > 0)
        contentList.push(linkList.join('\n'))

      if (description) {
        contentList.push(`### Description`)
        contentList.push(`${ description }`)
      }
      if (acceptance) {
        contentList.push(`### Acceptance Criteria`);
        contentList.push(`${ acceptance }`);
      }
    }
    const content = contentList.join('\n\n');
    console.log(content);
    return content;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getEpics(orgUrl: string, token: string): Promise<WorkItem[]> {
  try {
    let workItemTrackingApi: wi.WorkItemTrackingApi = await getWorkItemApi(orgUrl, token);

    const query = `Select [System.Id], [System.Title], [System.State], [System.Description] From WorkItems Where [System.WorkItemType] = 'Epic' AND [System.TeamProject] = 'Field_Assist' order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc`;
    const backlogRefList = await workItemTrackingApi.queryByWiql({ query: query })
    const backlogIds = backlogRefList?.workItems?.map(value => value.id) ?? [];
    // @ts-ignore
    return await getWorkItems(workItemTrackingApi, backlogIds);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
