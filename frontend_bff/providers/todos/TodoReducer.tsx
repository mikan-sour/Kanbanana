import { IColumnData, IKanbanAction, IKanbanContext, ITodo } from "../../types";
import { getColumnOrderDifference } from "../../utils/kanban";

const utilColumns = (columns:IColumnData,todo:ITodo) => {
    const columnArr = Object.values(columns)
    const targetColumnIndex = columnArr.findIndex(col => col.title === todo.status)
    const targetColumn = columnArr[targetColumnIndex];
    return targetColumn;
}

export const todoReducer = (state:IKanbanContext, action:IKanbanAction):IKanbanContext => {

    const { todos, columns, columnOrder, columnStart, columnEnd, todo, todoId } = action.payload; 

    switch(action.type){
        
        case 'INIT_STATE':
            return {todos,columns,columnOrder};

        case 'DRAG_UPDATE_SAME_COLUMN':
            if(!columnStart) return state;

            let updateColumns = {
                ...state.columns,
                [columnStart.id]: columnStart
            }

            let updatesSame = getColumnOrderDifference(state.columns,updateColumns)
            console.log(updatesSame)

            return {
                ...state,
                columns:updateColumns
            }
        
        case 'DRAG_UPDATE_NEW_COLUMN':
            if(!columnStart || !columnEnd) return;
            let updateColumnsMulti = {
                ...state.columns,
                [columnStart.id]:columnStart,
                [columnEnd.id]:columnEnd
            } 

            let updates = getColumnOrderDifference(state.columns,updateColumnsMulti)
            console.log(updates)

            return { ...state, columns:updateColumnsMulti};

        case 'ADD_NEW_TODO':
            if(!todo) return;

            const targetColumn = utilColumns(state.columns,todo)
            targetColumn.tasks.push(todo.id);

            const addNewTodoColumns = {
                ...state.columns,
                [targetColumn.id]:targetColumn
            }

            const addNewTodoState = [...state.todos,todo];

            return {...state,columns:addNewTodoColumns, todos:addNewTodoState};
        
        case "DELETE_TODO":
            if(!todoId) return;
            
            // remove from todos
            const updatedTodosAfterDelete = state.todos.filter( todo => todo.id !== todoId );
            
            // remove from column todos
            const targetTodo = state.todos.filter( todo => todo.id === todoId )[0];
            const targetColumnRemoveTask = utilColumns(state.columns,targetTodo)
            const delIndex = targetColumnRemoveTask.tasks.indexOf(targetTodo.id);
            if(delIndex !== -1) targetColumnRemoveTask.tasks.splice(delIndex,1)

            // console.log('$$$',targetTodo,targetColumnRemoveTask)
            
            const deleteTodoColumns = {
                ...state.columns,
                [targetColumnRemoveTask.id]:targetColumnRemoveTask
            }
            return {...state,todos:updatedTodosAfterDelete,columns:deleteTodoColumns};

        default: return state;
    }
} 