import React from 'react';
import { TodoContext } from '../../providers/todos';
import { ITodo } from '../../types';
import { handleTodoPostRequest } from '../../utils/database';
import { FormButtonGroup, FormButton } from './styled';

interface ITodoFormController {
    columnId:string,
    todo?:ITodo
}

interface ITodoFormView extends ITodoFormController {
    handleFormUpdate:(e:React.FormEvent<TTodoFormEventType>) => void
    submitForm:(e:React.FormEvent) => void
}

type TTodoFormEventType = HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement

const TodoFormView:React.FC<ITodoFormView> = ({todo,handleFormUpdate,submitForm}) => {
    return (
        <form onSubmit={submitForm}>
            <label htmlFor="todo-title">Title</label><br></br>
            <input 
                type="text" 
                id="todo-title" 
                onChange={handleFormUpdate}
                value={todo && todo.title}/>

            <label htmlFor="todo-priority">Priority:</label>
            <select 
                name="todo-priority" 
                id="todo-priority" 
                onChange={handleFormUpdate}
                value={todo && todo.priority}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
            </select>

            <label htmlFor="todo-dueDate">Birthday:</label>
            <input 
                type="date" 
                id="todo-dueDate" 
                name="todo-dueDate" 
                onChange={handleFormUpdate}
                value={todo && todo.dueDate}/>

            <label htmlFor="todo-details">Details</label>
            <textarea 
                id="todo-details" 
                name="todo-details" 
                onChange={handleFormUpdate}
                rows={8} cols={40}>
                {todo && todo.details}
            </textarea>

            <FormButtonGroup>
                <FormButton onClick={()=>console.log(todo)}>Cancel</FormButton>
                <FormButton type='submit'>Submit</FormButton>
            </FormButtonGroup>

        </form>
    )
}

// Controller
const TodoForm:React.FC<ITodoFormController> = ({todo,columnId}) => {

    // if no todo, must set status & userID first
    React.useEffect(()=> {
        if(!todo){
            setTodoForm(
                {
                    ...todoForm,
                    ownerId:'fb2baf72-a1f3-4156-94de-83960ac79675',
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
                console.log(todoForm)
                result = await handleTodoPostRequest(todoForm);
                console.log("post ",result)
                dispatch({type:"ADD_NEW_TODO",payload:{todo:result}})
            } 
             
            
        }catch(e){
            console.error(e);
        }
    }

    const todoFormViewProps:ITodoFormView = {todo,handleFormUpdate,submitForm,columnId}

    return <TodoFormView {...todoFormViewProps}/>;
}

export default TodoForm;
