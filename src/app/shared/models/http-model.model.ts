
export interface ITask {
  id?: number;
  title: string;
  status: TaskItems;
  priority: number;
  description: string;
  images?: string[]
}

export enum TaskItems {
  Default = 'default',
  New = 'new',
  InProgress = 'inProgress',
  Done = 'done',
}
