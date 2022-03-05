import styled from 'styled-components';

interface TodoContainerProps {isDragging:boolean}

export const TextWrapper = styled.p`
   width: 80%;
   justify-self:flex-start;
   overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`
export const Container = styled.div<TodoContainerProps>`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
    height: 5rem;

    background-color: ${props => props.isDragging ? '#d7ffd7' : "#FFF"}
`;

