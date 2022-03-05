import { CookieSerializeOptions } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import cookies from "../../../middleware";
import { ILoginForm } from '../../../types/types';
import {  comparePassword, hashPassword } from "../../../utils/auth";

const userServiceURI = "http://localhost:8081";

async function handler(req:NextApiRequest, res) {
    try {

        // get the body of the post
        const body:ILoginForm = JSON.parse(req.body)
    
        const hashedPW = await hashPassword(body.password)
    
        console.log(hashedPW)

        const credentialsPost = await fetch(`${userServiceURI}/signup`,{
            method:'POST',
            body:JSON.stringify(body)
        })
        const credentialsResponse = await credentialsPost.json()
        console.log(credentialsResponse)

        // return cookie
        const cookieOptions:CookieSerializeOptions = {
            secure:true,
            httpOnly:true,
            maxAge: 604800
        }
        res.cookie('asd',credentialsResponse.refreshToken,cookieOptions)
        // return jwt
    
        // console.log(hashedPW)

        const { accessToken, username, id, isAdmin } = credentialsResponse;
    
        res.status(201).json({ accessToken, username, id, isAdmin })
    } catch (e) {
        console.error(e)
    }
    
}

export default cookies(handler)