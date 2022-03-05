import React from 'react'
import { ILoginForm } from '../../../types/types'

interface ILoginSignupView {
    handleSubmit:(e:React.FormEvent<HTMLFormElement>) => void,
    handleFormUpdate:(e:React.FormEvent<HTMLInputElement>) => void,
    form:ILoginForm
}

const LoginSignupView:React.FC<ILoginSignupView> = ({handleSubmit,handleFormUpdate,form}) => {

  return (
    <form onSubmit={e => handleSubmit(e)}>
        <label>Username</label>
        <input
            id='username'
            onChange={handleFormUpdate} 
            value={form.username}
            type='text'></input>

        <label>Password</label>
        <input
            id='password'
            onChange={handleFormUpdate}
            value={form.password}  
            type='password'></input>

        <input type="submit" value="Submit" />
    </form>
  )
}

export default LoginSignupView;
