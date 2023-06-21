export interface ITask {
  title: string;
  status: TaskItems;
  id?: number;
  priority: number;
}

export enum TaskItems {
  Default = 'default',
  New = 'new',
  InProgress = 'inProgress',
  Done = 'done',
}
