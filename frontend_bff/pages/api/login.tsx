import { NextApiRequest, NextApiResponse } from "next";
import { ILoginForm } from '../../types';
import {  hashPassword } from "../../utils/auth";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {

        // get the body of the post
        const body:ILoginForm = JSON.parse(req.body)
    
        //
        const hashedPW = await hashPassword(body.password)
    
        console.log(hashedPW)
    
        res.status(200).json(body)
    } catch (e) {
        console.error(e)
    }
    
}