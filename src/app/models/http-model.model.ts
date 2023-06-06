export interface ITask {
    id: number;
    title: string;
    status: string;
}

export interface ITaskList {
    tasks: ITask[];
  }