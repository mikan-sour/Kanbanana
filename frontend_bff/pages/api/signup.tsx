import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../config";
import { ILoginForm } from '../../types';
import {  comparePassword, hashPassword } from "../../utils/auth";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {

        // get the body of the post
        const body:ILoginForm = JSON.parse(req.body)

        // confirm that username does not exist already
        
        // confirm pw is satisfactory
    
        // create a hash
        // const hashedPW = await hashPassword(body.password)

        // // compare
        // const compareResult = await comparePassword(body.password,hashedPW);
        // if (!compareResult) {
        //     res.status(401).json({error:"pw don't match"})
        // }
        // console.log(compareResult)
        // store in c vDB

        const credentialsPost = await fetch(`${server}/api/user_auth_service/signup`,{
            method:'POST',
            body:JSON.stringify(body)
        })
        const credentialsResponse = await credentialsPost.json()
        // console.log(credentialsResponse)

        // return cookie

        // return jwt
    
        // console.log(hashedPW)
    
        res.status(200).json(body)
    } catch (e) {
        console.error(e)
    }
    
}