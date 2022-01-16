import styled from 'styled-components';

interface TodoContainerProps {isDragging:boolean}

export const Container = styled.div<TodoContainerProps>`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => props.isDragging ? '#d7ffd7' : "#FFF"}
`;