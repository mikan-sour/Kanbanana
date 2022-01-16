import React from 'react';
import { IColumn, ITodo } from '../../types';
import Column from '../column';
import { Contanier } from './styled';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { TodoContext } from '../../providers/todos';
import { handleDragEndUtil, handleDragStartUtil } from '../../utils/kanban';
import Trash from '../trash';

const todoData = require('../../resources/todos.json');
const columnData = require('../../resources/columns.json');
const columnOrderData = require('../../resources/columnOrder.json');

const Kanban:React.FC<{}> = () => {
    
    const { state:kanbanState, dispatch } = React.useContext(TodoContext);
    const { todos,columns,columnOrder } = kanbanState;

    const [ isDragging, setIsDragging ] = React.useState(false);

    const handleInit = () => {
        dispatch({
            type:'INIT_STATE',
            payload:{
                todos:todoData,
                columns:columnData,
                columnOrder:columnOrderData
            }
        })
    }
    
    React.useEffect(()=> handleInit(),[])

    // React.useEffect(()=> console.log('***5',kanbanState),[kanbanState])

    const handleDragStart = (start:DragStart) => handleDragStartUtil(start,setIsDragging)
    const handleDragEnd = (result:DropResult) => handleDragEndUtil(result,columns,setIsDragging,dispatch);

    return (
        <Contanier>
            <DragDropContext 
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}>
                {columnOrder.map(colId => {
                    
                    const column:IColumn = columns[colId];
                    const taskOrder = column.tasks;
                    const tasks:ITodo[] = todos.filter(todo => column.tasks.includes(todo.id)).sort((a,b) => {
                        return taskOrder.indexOf(a.id) - taskOrder.indexOf(b.id)
                    });
                    
                    // console.log('(((',tasks);
                    
                    return <Column key={colId} column={column} todos={tasks} />
                })}
                <Trash/>
            </DragDropContext>
        </Contanier>
    )
}

export default Kanban;


