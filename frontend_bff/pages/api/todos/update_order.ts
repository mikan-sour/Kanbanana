import { NextApiRequest, NextApiResponse } from "next";

const todoServiceURI = "http://localhost:8080/todos";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const { query, body }  = req;

    try {
        const result = await fetch(`${todoServiceURI}/update_order`,{ 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method:'POST',body 
        })

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