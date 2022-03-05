import React from 'react';
import { IKanbanAction, IKanbanContext } from '../../types/types';
import { todoReducer } from './TodoReducer';

const initialState:IKanbanContext = {
    todos:[],
    columnOrder:[],
    columns:{},
    isLoading:true
}

export const TodoContext = React.createContext<{
    state:IKanbanContext,dispatch:React.Dispatch<IKanbanAction>
}>({
    state:initialState,
    dispatch:todoReducer as unknown as React.Dispatch<IKanbanAction>
})

const TodoProvider:React.FC<{}> = ({children}) => {
    const [state, dispatch ] = React.useReducer( todoReducer, initialState);
    const contextValue = React.useMemo(()=> {
        return {state, dispatch}
    },[state,dispatch]);

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;