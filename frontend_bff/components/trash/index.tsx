import React from 'react';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { GoTrashcan } from "react-icons/go";

import styled from 'styled-components';

const Container = styled.div<{dragging:boolean}>`
    border: dashed 3px darkgray;
    color:darkgray;
    font-size: large;
    font-weight: 700;
    height:4rem;
    width: 13rem;
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    /* visibility: ${props => props.dragging ? 'visible':'hidden'}; */
    background-color: ${props => props.dragging ? 'lightpink':'#FFF'};
`

const Trash:React.FC<{}> = () => {

    const [ isDraggingOverCheck, setIsDraggingOverCheck ] = React.useState<boolean>(false); 
    
    return (
        <Droppable droppableId={'trashcan'} >

            {(provided, snapshot:DroppableStateSnapshot) => {
                const { isDraggingOver } = snapshot;
                setIsDraggingOverCheck(isDraggingOver);
                return (
                    <>
                        
                        <Container 
                            dragging={isDraggingOverCheck}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                            <GoTrashcan size={'2.5rem'} color={'darkgrey'}/>
                            {!isDraggingOverCheck && <p>Drop Trash Here...</p>}
                            { provided.placeholder }
                        </Container>
                    </>
                    
                )        
            }}
                
        </Droppable>
            
    )
}

export default Trash;