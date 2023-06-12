export interface ITask {
    title: string;
    status: Endpoints;
    id?: number;
}


export enum Endpoints{
    Default ='default',
    New = 'new',
    InProgress = 'inProgress',
    Done = 'done'
}