import React, { useEffect } from 'react'
import Kanban from '../../components/kanban';
import Layout from '../../components/layout';
import AuthProvider from '../../providers/auth';
import TodoProvider from '../../providers/todos';
import { useSession } from "next-auth/react"
import { User } from 'next-auth';
import { ICustomAuthUser } from '../../types/types';
import { useRouter } from 'next/router';

function Dashboard( props ){

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(()=> {
        if(status === 'unauthenticated') router.push(`/login`);
    },[status,session])

    // const { user } = session;

    // const customUser = user as ICustomAuthUser;

    // if(!customUser.id) return <></>

    return (
        <AuthProvider>
            <TodoProvider>
                <Layout>
                    <Kanban userId={session ? session['id'] as string : ''}/>
                </Layout>
            </TodoProvider>
        </AuthProvider>  
    )
}

export default Dashboard;


function id(arg0: any, id: any) {
    throw new Error('Function not implemented.');
}
// export async function getStaticProps(){
//     // const { state:authState, dispatch } = React.useContext(AuthContext);

//     const response = await fetch(`http://localhost:3000/api/todos/initState?owner_id=${process.env.USER_ID}`); 
//     const data = await response.json();
//     console.log(data);

//     return {
//         props: {
//             kanbanData:data
//         }
//     }
// }