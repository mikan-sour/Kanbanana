import React from 'react';
import { TodoProps } from '../../types';
import { Container } from './styled';
import { Draggable } from 'react-beautiful-dnd';

const Todo:React.FC<TodoProps> = (props:TodoProps) => {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided, snapshot) =>  {
                // console.log("@@@",provided,snapshot)
                return (
                    <Container 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        >
                            {props.title}
                    </Container>
                    )
                }
            }
        </Draggable>
    )
}

export default Todo;