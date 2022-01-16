import bcrypt from 'bcrypt';
import { userAuthService } from '../../config';

export const comparePassword = async ( pw:string, hash:string ): Promise<boolean> => {
    try {
        const compareResult:boolean = await bcrypt.compare(pw, hash);
        if (!compareResult) {
            throw new Error ("hashes don't match");
        }
        return compareResult;

    } catch(e) {
        console.error(e);
    }
}

export const hashPassword = async (password:string):Promise<string> => {
    try {
        const hash = await bcrypt.hash(password, 10)

        if(!await bcrypt.compare(password, hash)) {
            throw new Error("hash doesn't match...")
        }

        return hash;
    } catch(e) {
        console.error(e);
    }
  }

  export const checkUsername = async (username:string):Promise<boolean> => {
    try{
        
        const res =  await fetch(`${userAuthService}/checkUserName`,{method:'POST',body:JSON.stringify({username})});
        return res.json();

    }catch(e) {
        console.error(e);
    }
  }