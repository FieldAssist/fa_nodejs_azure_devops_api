import { WorkItemExpand } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import * as azdev from "azure-devops-node-api";
import * as wi from "azure-devops-node-api/WorkItemTrackingApi";

const axios = require('axios');

async function getBacklogsRef(): Promise<any[]> {
  const data = JSON.stringify({ "query": "Select [System.Id], [System.Title], [System.State], [System.Description] From WorkItems Where [System.WorkItemType] = 'Product Backlog Item' AND [State] = 'Done' AND [System.IterationPath] = 'Field_Assist\\FA Team 2\\Sprint 120 T2' order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc" });

  const config = {
    method: 'post',
    url: 'https://dev.azure.com/flick2know/Field_Assist/FA%20Team%202/_apis/wit/wiql?api-version=6.0',
    headers: {
      'Authorization': 'Basic ----',
      'Content-Type': 'application/json',
      'Cookie': 'VstsSession=%7B%22PersistentSessionId%22%3A%225f041527-7d8b-4794-a35f-95fd40937822%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D'
    },
    data: data
  };

  const response = await axios(config)
  console.log(JSON.stringify(response.data));
  return response.data.workItems;
}

async function runApp() {
  try {

    const backlogRefList = await getBacklogsRef();
    const backlogIds = backlogRefList.map(value => value.id);

    let orgUrl = "https://dev.azure.com/flick2know";
    let token: string = "----"; // e.g "cbdeb34vzyuk5l4gxc4qfczn3lko3avfkfqyb47etahq6axpcqha";

    let authHandler = azdev.getPersonalAccessTokenHandler(token);
    let connection = new azdev.WebApi(orgUrl, authHandler);
    let workItemTrackingApi: wi.WorkItemTrackingApi = await connection.getWorkItemTrackingApi();
    const backlogs = await workItemTrackingApi.getWorkItems([...backlogIds], undefined, undefined, WorkItemExpand.All);

    let content = "# Sprint notes";

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
      content = content.concat(epicTitle ? `\n\n## ${ epicTitle }` : '').concat(featureTitle ? `\n\n## ${ featureTitle }` : '');
      content = content.concat(`\n\n## ${ title }`).concat(description ? `\n\n### ${ description }` : '').concat(acceptance ? `\n\n${ acceptance }` : '');
      content = content.concat(`\n\n### Related Links:`).concat(id ? `\nBacklog: [${ id }](${ url })  ` : '').concat(featureUrl ? `\nFeature: [${ featureId }](${ url })  ` : '').concat(epicId ? `\nEpic: [${ epicId }](${ epicUrl })  ` : '');
    }
    console.log(content);

  } catch (e) {
    console.error(e);
  }
}

runApp();