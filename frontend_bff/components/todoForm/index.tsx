import { useSession } from 'next-auth/react';
import React from 'react';
import { TodoContext } from '../../providers/todos';
import { ITodo } from '../../types/types';
import { handleTodoPatchRequest, handleTodoPostRequest } from '../../utils/database';
import  Button from '../atoms/button';
import { FormButtonGroup, TodoFormContainer, TodoFormLabel, TodoFormInput, TodoFormSelect } from './styled';

interface ITodoFormController {
    columnId:string,
    todo?:ITodo,
    handleClose:()=> void
}

interface ITodoFormView extends ITodoFormController {
    handleFormUpdate:(e:React.FormEvent<TTodoFormEventType>) => void
    submitForm:(e:React.FormEvent) => void,
}

type TTodoFormEventType = HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement

// Controller
const TodoForm:React.FC<ITodoFormController> = ({todo,columnId,handleClose}) => {

    const { data: session, status } = useSession();

    // if no todo, must set status & userID first
    React.useEffect(()=> {
        if(!todo){
            setTodoForm(
                {
                    ...todoForm,
                    ownerId:session['id'] as string,
                    status:columnId
                }
            );
        }
    } ,[todo])

    const [ todoForm, setTodoForm ] = React.useState<ITodo>(todo);
    const { state:_, dispatch } = React.useContext(TodoContext);

    function handleFormUpdate(e:React.FormEvent<TTodoFormEventType>) {
        const {currentTarget} = e;
        const key = currentTarget.id.slice(5);
        let val = currentTarget.value;
        if(key === 'dueDate') {
            const d = new Date(val);
            val = d.toISOString()
        }
        setTodoForm({...todoForm,[key]:val})
    }

    async function submitForm(e:React.FormEvent){
        e.preventDefault()
        try{
            let result:ITodo;
            if(!todo) {
                result = await handleTodoPostRequest(todoForm);
                dispatch({type:"ADD_NEW_TODO",payload:{todo:result}});
                handleClose();
                return;
            } 

            result = await handleTodoPatchRequest(todoForm);
            console.log('>',result);
            dispatch({type:"UPDATE_TODO",payload:{todo:result}});
            handleClose();
            return;
            
        }catch(e){
            console.error(e);
        }
    }

    const todoFormViewProps:ITodoFormView = {todo,handleFormUpdate,submitForm,columnId,handleClose}

    return <TodoFormView {...todoFormViewProps}/>;
}

const TodoFormView:React.FC<ITodoFormView> = ({todo,handleFormUpdate,submitForm,handleClose}) => {
    return (
        <TodoFormContainer onSubmit={submitForm} >
            <TodoFormLabel htmlFor="todo-title">Title</TodoFormLabel><br></br>
            <TodoFormInput
                type="text" 
                id="todo-title" 
                onChange={handleFormUpdate}
                value={todo && todo.title}/>

            <TodoFormLabel htmlFor="todo-priority">Priority:</TodoFormLabel>
            <TodoFormSelect 
                name="todo-priority" 
                id="todo-priority" 
                onChange={handleFormUpdate}
                value={todo && todo.priority}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
            </TodoFormSelect>

            <TodoFormLabel htmlFor="todo-dueDate">Due date:</TodoFormLabel>
            <TodoFormInput 
                type="date" 
                id="todo-dueDate" 
                name="todo-dueDate" 
                onChange={handleFormUpdate}
                value={todo && todo.dueDate}/>

            <TodoFormLabel htmlFor="todo-details">Details</TodoFormLabel>
            <textarea 
                id="todo-details" 
                name="todo-details" 
                onChange={handleFormUpdate}
                defaultValue={todo && todo.details}
                rows={8} cols={40}>
                
            </textarea>

            <FormButtonGroup>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Submit</Button>
            </FormButtonGroup>

        </TodoFormContainer>
    )
}



export default TodoForm;
