import React from "react";
import { ColumnProps } from "../../types/types";
import Todo from "../todo";
import { Container, TaskList, Title, TitleWrapper } from "./styled";
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import PlusLogo from "../atoms/logo/plus";
import { TodoContext } from "../../providers/todos";
import Modal from "../modal";
import TodoForm from "../todoForm";

const Column:React.FC<ColumnProps> = ({column,todos}) => {

    const { state:_, dispatch } = React.useContext(TodoContext);
    
    const [ modalOpen, setModalOpen ] = React.useState<boolean>(false);

    const [ isDraggingOverCheck, setIsDraggingOverCheck ] = React.useState<DroppableStateSnapshot>(
        {
            isDraggingOver:false,
            isUsingPlaceholder:false,
        }
    )

    const listRef = React.useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

    React.useLayoutEffect(()=> {
        if(todos.length !== 0) return;
        listRef.current.scrollTop = 0;

    },[todos.length])

    function handleAddTodo(){
        setModalOpen(true)
        // addNewTodo(column.title, dispatch)
    }

    function handleClose():void {
        setModalOpen(false);
    } 

    return !column ? 
    <></> :
    (
        <Container 
            ref={listRef}
            isDraggingOver={isDraggingOverCheck.isDraggingOver} disableScroll={todos.length===0}>
            <Modal isOpen={modalOpen} handleClose={handleClose} title='Add Todo'>
                <TodoForm columnId={column.id} handleClose={handleClose}/>
            </Modal>
            <TitleWrapper>
                <Title>{column.title}</Title>
                <PlusLogo onClick={handleAddTodo}/>
            </TitleWrapper>
            <Droppable droppableId={column.id}>
            {(provided, snapshot) => {

                React.useEffect(()=>{
                    setIsDraggingOverCheck(snapshot)
                },[snapshot])
                
                return (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {
                            todos.map((todo,index) => (
                                <Todo key={todo.id} {...todo} index={index} columnId={column.id}/>
                            ))
                        }
                        { provided.placeholder }
                    </TaskList>
                )
            }}
            </Droppable>
        </Container>

    )
}

export default Column;