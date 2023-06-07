export interface ITask {
    title: string;
    status: string;
    id?: number;
}

export interface ITaskList {
    tasks: ITask[];
  }