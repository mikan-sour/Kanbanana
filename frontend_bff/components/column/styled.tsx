import styled from 'styled-components';

interface ColumnnContainerProps {isDraggingOver:boolean}

export const Container = styled.div <ColumnnContainerProps>`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;
    width: 250px;
    height: 400px;
    transition: background-color 0.3s ease-out;
    background-color: ${props => props.isDraggingOver ? '#bbe6f7' : 'white'}; //#d7ffd7

`;

export const TitleWrapper = styled.div`
    padding:8px 12px 8px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const PlusButton = styled.div`
    border: 1px solid lightgray;
    border-radius: 50%;
    height: 16px;
    width: 16px;
`

export const Title = styled.h3`
    padding: 4px 8px;
`;

export const TaskList = styled.div`
    padding: 8px;
    min-height: 100%;
`;