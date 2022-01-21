import { NextApiRequest, NextApiResponse } from "next";

const todoServiceURI = "http://localhost:8080/todos";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const { query }  = req;

    try {
        const result = await fetch(`${todoServiceURI}?owner_id=${query['owner_id']}`)
        if(result.status !== 200) {
            const error = await result.json();
            console.error(result.status, error)
            throw new Error (error);
        }
        const data = await result.json()
        res.status(200).json(data)
    } catch(e) {
        console.error(e)
    }
    
}