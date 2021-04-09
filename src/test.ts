import { getEpics, getWorkItem, getWorkItemApi } from "./event";

import * as fs from 'fs';
import * as wi from "azure-devops-node-api/WorkItemTrackingApi";
import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";

const kebabCase = (string: string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()

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
  contentList.push(`# 👑 ${ epicDetail.title } ${epicDetail.id}`);
  contentList.push(`**Epic:** [${ epicDetail.id }](${ epicDetail.url })`);

  if (epicDetail.description) {
    contentList.push(`### Description`);
    contentList.push(`${ epicDetail.description }`);
  }
  if (epicDetail.acceptance) {
    contentList.push(`### Acceptance Criteria`);
    contentList.push(`${ epicDetail.acceptance }`);
  }
  return contentList.join('\n\n');
}

function getFeatureContent(featureDetail: WorkItemDetail): string {
  const contentList = [];
  contentList.push(`## 🏆 ${ featureDetail.title } ${featureDetail.id}`);
  contentList.push(`**Feature:** [${ featureDetail.id }](${ featureDetail.url })`);

  if (featureDetail.description) {
    contentList.push(`### Description`);
    contentList.push(`${ featureDetail.description }`);
  }
  if (featureDetail.acceptance) {
    contentList.push(`### Acceptance Criteria`);
    contentList.push(`${ featureDetail.acceptance }`);
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

      const epicDetail = getWorkItemDetail(epic);

      const contentList: string[] = [];

      const epicContent = getEpicContent(epicDetail);
      contentList.push(epicContent);
      const relations = (epic.relations ?? []).filter(value => value.rel === "System.LinkTypes.Hierarchy-Forward");

      if (relations?.length ?? 0 > 0) {
        // @ts-ignore
        contentList.push(`# Features (${ relations.length })`)
      }

      for (const featureRef of relations ?? []) {
        const featureId: string = featureRef.url?.split('/').reverse()[0] ?? "-1";
        if (!isNaN(Number(featureId))) {
          console.log(`Generating Feature: ${ featureId }`);
          let workItemTrackingApi: wi.WorkItemTrackingApi = await getWorkItemApi(orgUrl, token)
          await delay(1000);
          const feature = await getWorkItem(workItemTrackingApi, parseInt(featureId));
          const featureDetail = getWorkItemDetail(feature);
          const featureContent = getFeatureContent(featureDetail);
          contentList.push(featureContent);
        } else {
          console.error(`Invalid feature id: ${ featureId }`);
        }
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