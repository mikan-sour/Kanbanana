import React from "react";
import { ColumnProps } from "../../types";
import Todo from "../todo";
import { Container, PlusButton, TaskList, Title, TitleWrapper } from "./styled";
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import PlusLogo from "../atoms/logo/plus";
import { TodoContext } from "../../providers/todos";
import { addNewTodo } from "../../utils/kanban";
import Modal from "../modal";

const Column:React.FC<ColumnProps> = ({column,todos}) => {

    const { state:_, dispatch } = React.useContext(TodoContext);
    
    const [ modalOpen, setModalOpen ] = React.useState<boolean>(false);

    const [ isDraggingOverCheck, setIsDraggingOverCheck ] = React.useState<DroppableStateSnapshot>(
        {
            isDraggingOver:false,
            isUsingPlaceholder:false,
        }
    )

    function handleAddTodo(){
        setModalOpen(true)
        addNewTodo(column.title, dispatch)
    }

    function handleClose():void {
        setModalOpen(false);
    } 


    return (
        <Container isDraggingOver={isDraggingOverCheck.isDraggingOver}>
            <Modal isOpen={modalOpen} handleClose={handleClose} title='Add Todo'>
                <h1>My Content</h1>
            </Modal>
            <TitleWrapper>
                <Title>{column.title}</Title>
                <PlusLogo onClick={handleAddTodo}/>
            </TitleWrapper>
            <Droppable droppableId={column.id}>
            {(provided, snapshot) => {
                setIsDraggingOverCheck(snapshot)
                return (
                    <TaskList 
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {
                            todos.map((todo,index) => (
                                <Todo key={todo.id} {...todo} index={index}/>
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