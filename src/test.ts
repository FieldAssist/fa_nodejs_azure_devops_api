import { getEpics, getWorkItem, getWorkItemApi } from "./event";

import * as fs from 'fs';
import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";

const kebabCase = (string: string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()

const delayTimeInMs = 1000;

export function getWorkItemDetail(item: WorkItem): WorkItemDetail {
  // @ts-ignore
  const title = item.fields['System.Title'];
  // @ts-ignore
  const description = item.fields['System.Description'];
  // @ts-ignore
  const acceptance = item.fields['Microsoft.VSTS.Common.AcceptanceCriteria'];
  const id = item.id ?? -1;
  const url = item._links.html.href;
  return {
    title: title,
    description: description,
    id: id,
    acceptance: acceptance,
    url: url,
  };
}

function getEpicContent(epicDetail: WorkItemDetail): string {
  const contentList = [];
  contentList.push(`# 👑 ${ epicDetail.title } ${ epicDetail.id }`);
  contentList.push('::: toc Table of Contents\n' + '[[toc]]\n' + ':::')
  contentList.push(`#### Epic: [${ epicDetail.id }](${ epicDetail.url })`);

  if (epicDetail.description) {
    contentList.push(`#### Description`);
    contentList.push(`${ epicDetail.description }`);
  }
  if (epicDetail.acceptance) {
    contentList.push(`#### Acceptance Criteria`);
    contentList.push(`${ epicDetail.acceptance }`);
  }
  return contentList.join('\n\n');
}

async function getFeatureContent(id: number, workItemTrackingApi: WorkItemTrackingApi): Promise<string> {
  console.log(`Generating Feature: ${ id }`);
  const feature = await getWorkItem(workItemTrackingApi, id);
  const featureDetail = getWorkItemDetail(feature);

  const contentList = [];
  contentList.push(`## ➡️ ${ featureDetail.title } ${ featureDetail.id }`);
  contentList.push(`#### Feature: [${ featureDetail.id }](${ featureDetail.url })`);

  if (featureDetail.description) {
    contentList.push(`#### Description`);
    contentList.push(`${ featureDetail.description }`);
  }
  if (featureDetail.acceptance) {
    contentList.push(`#### Acceptance Criteria`);
    contentList.push(`${ featureDetail.acceptance }`);
  }

  const relations = (feature.relations ?? []).filter(value => value.rel === "System.LinkTypes.Hierarchy-Forward");

  const backlogContentList = [];
  for (const ref of relations) {
    const backlogId: string = ref.url?.split('/').reverse()[0] ?? "-1";
    await delay(delayTimeInMs);
    const backlogContent = await getBacklogContent(parseInt(backlogId), workItemTrackingApi);
    backlogContentList.push(`::: backlogs Backlog \n${ backlogContent }\n:::`);
  }

  if (backlogContentList.length > 0) {
    contentList.push(backlogContentList.join('\n\n'));
  }


  return contentList.join('\n\n');
}

async function getBacklogContent(id: number, workItemTrackingApi: WorkItemTrackingApi): Promise<string> {
  console.log(`Generating Backlog: ${ id }`);
  const backlog = await getWorkItem(workItemTrackingApi, id);
  const detail = getWorkItemDetail(backlog);

  const contentList = [];
  contentList.push(`### 📝 ${ detail.title } ${ detail.id }`);
  contentList.push(`#### Backlog: [${ detail.id }](${ detail.url })`);

  if (detail.description) {
    contentList.push(`#### Description`);
    contentList.push(`${ detail.description }`);
  }
  if (detail.acceptance) {
    contentList.push(`#### Acceptance Criteria`);
    contentList.push(`${ detail.acceptance }`);
  }
  return contentList.join('\n\n');
}

export async function runApp2() {
  try {
    let token = "---";
    let orgUrl = `https://dev.azure.com/flick2know`;

    const epics = await getEpics(orgUrl, token);
    for (const epic of epics) {
      console.log(`Generating Epic: ${ epic.id }`);
      const contentList: string[] = [];

      const epicDetail = getWorkItemDetail(epic);
      const epicContent = getEpicContent(epicDetail);
      contentList.push(epicContent);

      const relations = (epic.relations ?? []).filter(value => value.rel === "System.LinkTypes.Hierarchy-Forward");

      for (const featureRef of relations ?? []) {
        const featureId: string = featureRef.url?.split('/').reverse()[0] ?? "-1";
        await delay(delayTimeInMs);
        const workItemTrackingApi = await getWorkItemApi(orgUrl, token)
        const featureContent = await getFeatureContent(parseInt(featureId), workItemTrackingApi);
        contentList.push(featureContent);
      }

      const content = contentList.join("\n\n");
      await fs.promises.writeFile(`../fa_vuepress_product_docs/docs/src/guide/epics/${ kebabCase(epicDetail.title) }.md`, content);
    }
  } catch (e) {
    console.error(e);
  }
}


runApp2();


export interface WorkItemDetail {
  title: string,
  description: string,
  id: number,
  acceptance: string,
  url: string,
}

function delay(delayInms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}