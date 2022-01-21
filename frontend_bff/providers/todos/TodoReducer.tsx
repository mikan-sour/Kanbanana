import { IKanbanAction, IKanbanContext } from "../../types";
import { getColumnOrderDifference, utilColumns } from "../../utils/kanban";

export const todoReducer = (state:IKanbanContext, action:IKanbanAction):IKanbanContext => {

    const { isLoading, todos, columns, columnOrder, columnStart, columnEnd, todo, todoId } = action.payload; 

    switch(action.type){

        case 'SET_LOADING':
            return {...state,isLoading}
        
        case 'INIT_STATE':
            return {todos,columns,columnOrder,isLoading:false};

        case 'DRAG_UPDATE_SAME_COLUMN':
            if(!columnStart) return state;

            let updateColumns = {
                ...state.columns,
                [columnStart.id]: columnStart
            }

            // format post request
            let updatesSame = getColumnOrderDifference(state.columns,updateColumns);

            // do DB action

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
            console.log(targetColumn);
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

            
            const deleteTodoColumns = {
                ...state.columns,
                [targetColumnRemoveTask.id]:targetColumnRemoveTask
            }
            return {...state,todos:updatedTodosAfterDelete,columns:deleteTodoColumns};

        default: return state;
    }
} 