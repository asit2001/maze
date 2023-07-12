import axios from "axios";
import jwt_decode from "jwt-decode";
import { decodeJWT } from "../type";
interface RegisterUserProps{
    email:string;
    password:string;
    name:string
}



export async function registerUser(data:RegisterUserProps){
    try{
        axios.defaults.baseURL = process.env.REACT_APP_API
        const res = await axios.post("/api/user/signup",data)
        return res.data
    }catch (e:any){
        throw new Error(e.response.data.error)

    }
}
export function extractTokenFromCookie(cookieName:string) {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      if (cookie.startsWith(cookieName + '=')) {
        const token = cookie.substring(cookieName.length + 1);
        return token;
      }
    }
    
    return null; // Token not found
  }

export function decodeTokenFromCookie(tokenName:string){
    try {
        const token = extractTokenFromCookie(tokenName);
    if (token) {
        return jwt_decode(token) as decodeJWT
    }
    return null
    } catch (error) {
        return null;
    }
}
