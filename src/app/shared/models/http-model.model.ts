export interface ITask {
  title: string;
  status: TaskItems;
  id?: number;
}

export enum TaskItems {
  Default = 'default',
  New = 'new',
  InProgress = 'inProgress',
  Done = 'done',
}
