export interface ITask {
    title: string;
    status: TaskStatus;
    id?: number;
}

export enum TaskStatus {
    New = 'new',
    InProgress = 'inProgress',
    Done = 'done'
  }
