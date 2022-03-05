import React from 'react';
import { IColumn, IInitialState, ITodo } from '../../types/types';
import Column from '../column';
import { Contanier } from './styled';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { TodoContext } from '../../providers/todos';
import { handleDragEndUtil, handleDragStartUtil } from '../../utils/kanban';
import Trash from '../trash';
import { useSession } from 'next-auth/react';

// const todoData = require('../../resources/todos.json');
// const columnData = require('../../resources/columns.json');
// const columnOrderData = require('../../resources/columnOrder.json');

const Kanban:React.FC<{userId:string}> = ({userId}) => {

    const { data: session, status } = useSession();
    
    const { state:kanbanState, dispatch } = React.useContext(TodoContext);
    const { todos,columns,columnOrder, isLoading } = kanbanState;

    const [ isDragging, setIsDragging ] = React.useState<boolean>(false);

    const handleInit = async() => {

        
        try {
            dispatch({type:'IS_LOADING',payload:{isLoading:true}})
            const res =  await fetch(`/api/todos/initState?owner_id=${userId}`);
            const data:IInitialState = await res.json();
            const { todos, columns } = data;
            const columnOrder = ['todo','doing','done']
            dispatch({
                type:'INIT_STATE',
                payload:{
                    todos,
                    columns,
                    columnOrder,
                }
            });
        
        }catch(e){
            console.log(e)
        }
        
    }
    
    React.useEffect(()=> {
        if(userId) handleInit()
    },[userId])

    const handleDragStart = (start:DragStart) => handleDragStartUtil(start,setIsDragging)
    const handleDragEnd = (result:DropResult) => handleDragEndUtil(result,columns,setIsDragging,dispatch);

    return isLoading ?
    <h1>Loading...</h1>:
    (
        <Contanier>
            <DragDropContext 
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}>
                {columnOrder.map((colId) => {
                    
                    const column:IColumn = columns[colId];
                    const taskOrder = column ? column.tasks : [];
                    
                    const tasks:ITodo[] = !column && !column.tasks ? [] : todos.filter(todo => column.tasks.includes(todo.id)).sort((a,b) => {
                        return taskOrder.indexOf(a.id) - taskOrder.indexOf(b.id)
                    });
                                        
                    return <Column key={colId} column={column} todos={tasks} />
                })}
                <Trash/>
            </DragDropContext>
        </Contanier>
    )
}

export default Kanban;


