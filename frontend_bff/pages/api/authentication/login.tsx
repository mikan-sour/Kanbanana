import { NextApiRequest, NextApiResponse } from "next";
import { ILoginForm } from '../../../types/types';
import {  hashPassword } from "../../../utils/auth";

const userServiceURI = "http://localhost:8081";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {

        // get the body of the post
        const body:ILoginForm = JSON.parse(req.body)
    
        const hashedPW = await hashPassword(body.password)
    
        console.log(hashedPW)

        const credentialsPost = await fetch(`${userServiceURI}/login`,{
            method:'POST',
            body:JSON.stringify({username:body.username,password:hashedPW})
        })

        // const credentialsResponse = await credentialsPost.json()
        
        // console.log(credentialsResponse)
    
        res.status(200).json(body)
    } catch (e) {
        console.error(e)
    }
    
}