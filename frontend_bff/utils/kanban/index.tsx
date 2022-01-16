import React from "react";
import { DragStart, DropResult } from "react-beautiful-dnd";
import { IColumn, IColumnData, IKanbanAction, ITodo, TColumnChange } from "../../types";

export function handleDragStartUtil(start: DragStart, setIsdragging:React.Dispatch<React.SetStateAction<boolean>>) {
    // console.log(start);
    setIsdragging(true);
}

export const handleDragEndUtil = (result:DropResult, columns:IColumnData,setIsdragging:React.Dispatch<React.SetStateAction<boolean>>,dispatch:React.Dispatch<IKanbanAction>) => {
    setTimeout(()=> setIsdragging(false), 5000);
    
    const { destination, source, draggableId } = result;

    if(!destination) {
        return;
    }

    if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    }

    // handle delete trash
    if(destination.droppableId === 'trashcan') {
        dispatch({type:"DELETE_TODO",payload:{todoId:draggableId}})
        return
    }

    const columnStart = columns[source.droppableId];
    const columnEnd = columns[destination.droppableId];

    if(columnStart === columnEnd) {
        const newTasks = Array.from(columnStart.tasks);
        // console.log('$$$',source.index,destination.index,newTasks,draggableId)
        newTasks.splice(source.index,1);
        newTasks.splice(destination.index,0,draggableId);
        // console.log('$$$3',newTasks);
        const newColumn:IColumn = {
            ...columnStart,
            tasks: newTasks
        }
        // console.log('***',newColumn)
        dispatch({type:'DRAG_UPDATE_SAME_COLUMN',payload:{columnStart:newColumn}});
        return;
    }

    // move from one list to another
    const startTasks = Array.from(columnStart.tasks);
    startTasks.splice(source.index,1);
    const newColumnStart:IColumn = {
        ...columnStart,
        tasks:startTasks
    }

    const finishTasks = Array.from(columnEnd.tasks);
    finishTasks.splice(destination.index,0,draggableId);
    const newColumnEnd:IColumn = {
        ...columnEnd,
        tasks:finishTasks
    }

    dispatch({type:'DRAG_UPDATE_NEW_COLUMN',payload:{columnStart:newColumnStart,columnEnd:newColumnEnd}});
    return;

}

export const addNewTodo = (columnTitle:string,dispatch:React.Dispatch<IKanbanAction>):void => {

    let title = window.prompt("enter a todo title")

    let now = Date.parse(new Date().toUTCString());
    const todo: ITodo = {
        title,
        ownerId:"dsafdsatyjknbvfty",
        createdDate:now,
        lastModified:now,
        status:columnTitle,
        details:'',
        id:now.toString(),
        priority:1
    } 


    dispatch({type:'ADD_NEW_TODO',payload:{todo}});
    return;
}

export const getColumnOrderDifference = (before:IColumnData,after:IColumnData):TColumnChange[] => {
    // get keys of before
    const columnKeys = Object.keys(before);

    // function to get the tasks
    function checkArr(obj:IColumnData,key:string){
        return obj[key]['tasks'].join(',');
    }

    const columnChanges:TColumnChange[] = [];
    // map tasks to array of changes for easy sql execution
    columnKeys.forEach((key:string) => {
        if(checkArr(before,key) !== checkArr(after,key)) {

            after[key]['tasks'].forEach((t:number|string, i:number) => {
                columnChanges.push({todoId:t,columnId:after[key]['id'],order:i+1})
            })

        }
    })

    return columnChanges;

}