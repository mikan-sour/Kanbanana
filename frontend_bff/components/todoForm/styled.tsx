import styled from "styled-components";

export const TodoFormContainer = styled.form`
    display: flex;
    flex-direction:column;
    align-items: left;
    justify-content:space-around;
`

export const TodoFormLabel = styled.label`
    margin: .5rem 0;
`

export const TodoFormInput = styled.input`
    height: 1.5rem;
`

export const TodoFormSelect = styled.select`
    height: 1.5rem;
`
 
export const FormButtonGroup = styled.div`
    position:fixed;
    bottom:.75rem;
    right:.75rem;
    padding:.5rem;
    display:flex;
    align-items:center;
    justify-content:space-around;
    flex-direction:row;
`

export const FormButton = styled.button`
    /* position:absolute;
    bottom:.75rem;
    right:.75rem; */

    width: 8rem;
    height:2.7rem;
    border-radius: 5px;
    font-size: 1rem;
    padding:1.25rem;
    margin: 0 .25rem;
    text-align: center;
    background-color:salmon;
    border:none;
    display:flex;
    align-items:center;
    justify-content:center;

`