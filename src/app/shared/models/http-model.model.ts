import { SafeUrl } from "@angular/platform-browser";

export interface ITask {
  id?: number;
  title: string;
  status: TaskItems;
  priority: number;
  description: string;
  image?: SafeUrl
}

export enum TaskItems {
  Default = 'default',
  New = 'new',
  InProgress = 'inProgress',
  Done = 'done',
}
