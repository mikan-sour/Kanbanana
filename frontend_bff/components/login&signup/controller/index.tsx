import React, { useEffect } from 'react'
import { AuthContext } from '../../../providers/auth';
import { ILoginForm } from '../../../types/types';
import LoginSignupView from '../view';
import { useRouter } from 'next/router';
import { signIn, useSession } from "next-auth/react";

const LoginSignupController:React.FC<{type:'login'|'signup'}> = ({type}) => {

    const { data: session, status } = useSession();

    const { state:authState, dispatch } = React.useContext(AuthContext);

    const [ form, set ] = React.useState<ILoginForm>({username:"",password:""});

    const router = useRouter();

    useEffect(()=>{
        if(session) router.push(`/dashboard/${session['id'] ? session['id'] : 'k'}`);
    },[session])

    function handleFormUpdate(e:React.FormEvent<HTMLInputElement>){
        const { id , value} = e.currentTarget;
        set({...form,[id]:value})
    }

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        signIn('google')
        // const res = await fetch(`/api/auth/j`)
        // console.log(res)

        // const res = await fetch(`/api/auth/${type}`,{method:'POST',body:JSON.stringify(form)})
        // const data = await res.json()
        // const { id, username, isAdmin, accessToken } = data;
        // console.log({ id, username, isAdmin, accessToken })

        // //auth reducer
        // dispatch({type:'UPDATE_STATE',payload:{id,username,isAdmin,accessToken}});
        // router.push(`/dashboard/${data.id}`)

    }

    const props = React.useMemo(()=> {
        return {
            handleFormUpdate,
            handleSubmit,
            form
        }
    },[form,handleFormUpdate,handleSubmit])

    return (
        <LoginSignupView {...props}/>
    )
}

export default LoginSignupController
