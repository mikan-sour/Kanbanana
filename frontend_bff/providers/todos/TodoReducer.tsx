import { IKanbanAction, IKanbanContext } from "../../types/types";
import { handleUpdateOrder } from "../../utils/database";
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
            try {
                const result = handleUpdateOrder(updatesSame);
                if(!result) {
                    throw new Error('something happened')
                }
            }catch(e){
                console.error(e)
                // should return state
                return state;
            }

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
            try {
                const result = handleUpdateOrder(updates);
                if(!result) {
                    throw new Error('something happened')
                }
            }catch(e){
                console.error(e)
                // should return state
                return state;
            }

            return { ...state, columns:updateColumnsMulti};

        case 'ADD_NEW_TODO':
            if(!todo) return;
            const targetColumnAdd = utilColumns(state.columns,todo)
            console.log(targetColumnAdd);
            targetColumnAdd.tasks.push(todo.id);

            const addNewTodoColumns = {
                ...state.columns,
                [targetColumnAdd.id]:targetColumnAdd
            }

            const addNewTodoState = [...state.todos,todo];

            return {...state,columns:addNewTodoColumns, todos:addNewTodoState};
        
        case "UPDATE_TODO":
            // have a todo
            if(!todo) return;

            // make a new todos state
            const updatedTodos = Array.from(state.todos);
            const indexOfOldTodo = updatedTodos.findIndex(target => target.id === todo.id);

            //Splice and dice
            updatedTodos.splice(indexOfOldTodo,1)
            updatedTodos.splice(indexOfOldTodo,0,todo);

            return {...state, todos:updatedTodos};;
        
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