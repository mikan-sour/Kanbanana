import styled from 'styled-components';

interface ColumnnContainerProps {isDraggingOver:boolean,disableScroll:boolean}

export const Container = styled.div <ColumnnContainerProps>`
    margin: 16px;
    border: 1px solid lightgray;
    border-radius: 2px;
    width: 250px;
    height: 450px;
    transition: background-color 0.3s ease-out;
    overflow:hidden;
    background-color: ${props => props.isDraggingOver ? '#bbe6f7' : 'white'}; //#d7ffd7

    ${props => !props.disableScroll && `

        overflow-y:scroll;

        /* width */
        ::-webkit-scrollbar {
        width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
        background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: #FFE81C;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        background: #555;
        }
    
    `}

   

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
    min-height: 75%;
`;