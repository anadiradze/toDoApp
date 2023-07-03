export interface ITask {
  id?: number;
  title: string;
  status: TaskItems;
  priority: number;
  description: string;
}

export enum TaskItems {
  Default = 'default',
  New = 'new',
  InProgress = 'inProgress',
  Done = 'done',
}
