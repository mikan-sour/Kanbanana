import styled from 'styled-components';


export const ModalOverlay = styled.div`
    background-color: rgba(1,1,1,.3);
    position: fixed;
    top:0;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(2px);
`

export const ModalWrapper = styled.div`
    position: fixed;
    left: 50%;top:50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 400px;
    width: 45vw;
    height: 65vh;
    transition: translateY(5rem);

`

export const ModalHeader = styled.div`
    padding: 8px;
    border-bottom: 1px solid lightgrey;
    width: 100%;
    height: 4rem;
    background-color: #FFF;
    border-top-left-radius:2px;
    border-top-right-radius:2px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
        padding:8px;
        margin:0;
    }
`

export const ModalBody = styled.div`
    padding: 8px;
    border-bottom: 1px solid lightgrey;
    width: 100%;
    background-color: #FFF;
    flex-grow: 1;
    border-bottom-left-radius:2px;
    border-bottom-right-radius:2px;
`