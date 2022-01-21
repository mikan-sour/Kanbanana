import { NextApiRequest, NextApiResponse } from "next";

const todoServiceURI = "http://localhost:8080/todos";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const { query:{ id },method, body }  = req;

    console.log(body)

    if(!["GET","DELETE","PATCH","POST"].includes(method)) {
        res.status(405).json({error:"Method Not Allowed"});
        return;
    }

    try {
        const urlWithQuery = method === "POST" ? todoServiceURI: `${todoServiceURI}?todo_id=${id}`;
        const result = await fetch(urlWithQuery,
            { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method,body: ['PATCH','POST'].includes(method) ? body : undefined 
            }
        );
        if(result.status !== 200 && result.status !== 201) {
            console.error(result.status, await result.json())
            throw new Error (await result.json());
        }
        const data = await result.json()
        res.status(200).json(data)
    } catch(e) {
        console.error(e)
    }
    
}