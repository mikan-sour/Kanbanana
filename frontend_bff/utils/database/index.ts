import { ITodo, TColumnChange } from "../../types/types";

export async function handleTodoDeleteRequest(id:string):Promise<boolean>{

    try{
        const res =  await fetch(`http://localhost:3000/api/todos/${id}`,{method:'DELETE'});
        const data:{deleted:boolean} = await res.json();
        return data.deleted;
    }catch(e){
        console.error(e)
    }

}

export async function handleTodoGetRequest(id:string):Promise<ITodo>{

    try{
        const res =  await fetch(`http://localhost:3000/api/todos/${id}`,{method:'GET'});
        const data:ITodo = await res.json();
        return data;
    }catch(e){
        console.error(e)
    }

}

export async function handleTodoPostRequest(todo:ITodo):Promise<ITodo>{

    try{
        const res =  await fetch(`http://localhost:3000/api/todos/1`,{method: "POST",body:JSON.stringify(todo)});
        const data:ITodo = await res.json();
        return data;
    }catch(e){
        console.error(e)
    }

}

export async function handleTodoPatchRequest(todo:ITodo):Promise<ITodo>{

    try{
        const res =  await fetch(`http://localhost:3000/api/todos/${todo.id}`,{method: "PATCH",body:JSON.stringify(todo)});
        const data:ITodo = await res.json();
        return data;
    }catch(e){
        console.error(e)
    }

}

export async function handleUpdateOrder(updates: TColumnChange[]) {
    try{
        const res =  await fetch(`http://localhost:3000/api/todos/update_order`,{method: "POST",body:JSON.stringify(updates)});
        const data:TColumnChange[] = await res.json();
        return data;
    }catch(e){
        console.error(e)
    }
}
