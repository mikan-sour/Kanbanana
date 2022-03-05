import React from 'react';
import { TodoProps } from '../../types/types';
import { Container, TextWrapper } from './styled';
import { Draggable } from 'react-beautiful-dnd';
import { GoPencil } from 'react-icons/go';
import Modal from '../modal';
import TodoForm from '../todoForm';
import { useSession } from 'next-auth/react';

const Todo:React.FC<TodoProps> = (props:TodoProps) => {

    const [ modalOpen, setModalOpen ] = React.useState<boolean>(false);

    function handleEditTodo(){
        setModalOpen(true)
    }

    function handleClose():void {
        setModalOpen(false);
    } 

    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided, snapshot) =>  {
                return (
                    <Container 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        >
                            <Modal isOpen={modalOpen} handleClose={handleClose} title='Add Todo'>
                                <TodoForm columnId={props.columnId} todo={props} handleClose={handleClose}/>
                            </Modal>
                            <TextWrapper>
                                {props.title}
                            </TextWrapper>
                            <GoPencil 
                                onClick={handleEditTodo}
                                size={'18px'}
                                style={{margin:',5rem'}}/>
                    </Container>
                    )
                }
            }
        </Draggable>
    )
}

export default Todo;