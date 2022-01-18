export interface ILoginForm {
    username:string
    password:string
}

export interface IInitialState {
    todos: ITodo[],
    columns: {
        todo:IColumn,
        doing:IColumn,
        done:IColumn
    }
}

export interface ITodo {
    id: string;
    ownerId: string;
    title: string;
    details: string;
    priority: number;
    status: string;
    order: number;
    dueDate?: number;
    createdDate: number;
    lastModified: number;
  }

export interface IColumn {
    id: string;
    title: string;
    tasks?: string[];
}

export interface IColumnData {
    [key:string]:IColumn
}

export interface ColumnProps {
    column:IColumn,
    todos?:ITodo[]
}

export interface KanbanProps {
    todos:ITodo[],
    columns:IColumnData,
    columnOrder:string[]
}

export interface TodoProps extends ITodo {
    index:number
}

export interface IKanbanAction {
    type:string,
    payload:{
        isLoading?:boolean,
        todos?:ITodo[],
        columns?:IColumnData,
        columnOrder?:string[],
        columnStart?:IColumn,
        columnEnd?:IColumn,
        todo?:ITodo,
        todoId?:string,
    }
}

export interface IKanbanContext {
    isLoading:boolean,
    todos?:ITodo[],
    columns?:IColumnData,
    columnOrder?:string[]
}

export type TColumnChange = {todoId:number|string,columnId:number|string, order:number}

  