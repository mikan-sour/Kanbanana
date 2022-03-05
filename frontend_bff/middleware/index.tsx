import { CookieSerializeOptions } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"
import { cookie } from "../utils/auth"

/**
   * Adds `cookie` function on `res.cookie` to set cookies for response
   */
const cookies = (handler) => (req:NextApiRequest, res:NextApiResponse & {cookie}) => {
    res.cookie = (name:string, value:string, options:CookieSerializeOptions) => cookie(res, name, value, options)
  
    return handler(req, res)
  }
  
export default cookies