import React from 'react'
import { server } from '../config';
import { ILoginForm } from '../types';

function Login() {

    const [ form, set ] = React.useState<ILoginForm>({username:"",password:""});

    function handleFormUpdate(e:React.FormEvent<HTMLInputElement>){
        const { id , value} = e.currentTarget;
        console.log(id,value)
        set({...form,[id]:value})
    }

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const res = await fetch(`${server}/api/signup`,{method:'POST',body:JSON.stringify(form)})
        const data = await res.json()
        console.log(data)
    }

    return (
    
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    id='username'
                    onChange={handleFormUpdate} 
                    type='text'></input>

                <label>Password</label>
                <input
                    id='password'
                    onChange={handleFormUpdate}  
                    type='password'></input>

                <input type="submit" value="Submit" />
            </form>
        
    )
  }
  
  export default Login