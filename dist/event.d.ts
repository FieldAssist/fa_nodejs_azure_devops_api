import * as wi from "azure-devops-node-api/WorkItemTrackingApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
export declare function getWorkItemApi(orgUrl: string, token: string): Promise<wi.WorkItemTrackingApi>;
export declare function getWorkItems(workItemTrackingApi: WorkItemTrackingApi, ids: []): Promise<WorkItem[]>;
export declare function getWorkItem(workItemTrackingApi: WorkItemTrackingApi, id: number): Promise<WorkItem>;
export declare function genSprintNotes(orgUrl: string, token: string, iterationPaths: string[]): Promise<string>;
export declare function getEpics(orgUrl: string, token: string): Promise<WorkItem[]>;
//# sourceMappingURL=event.d.ts.map