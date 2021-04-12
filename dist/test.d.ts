import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
export declare function getWorkItemDetail(item: WorkItem): WorkItemDetail;
export declare function getEpicMarkdownBody(epic: WorkItem, orgUrl: string, token: string): Promise<Epic>;
export declare function runApp2(): Promise<void>;
export interface WorkItemDetail {
    title: string;
    description: string;
    id: number;
    acceptance: string;
    url: string;
}
export interface Epic {
    title: string;
    content: string;
}
//# sourceMappingURL=test.d.ts.map