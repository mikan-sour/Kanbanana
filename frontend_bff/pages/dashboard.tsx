import React from 'react'
import Kanban from '../components/kanban';
import Layout from '../components/layout';
import TodoProvider from '../providers/todos';


function Dashboard(){

    return (
        <TodoProvider>
            <Layout>
                <Kanban/>
            </Layout>
        </TodoProvider>
    )
}

export default Dashboard;