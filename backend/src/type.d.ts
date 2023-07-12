
export interface User {
  name: string;
  email: string;
  password: string;
    
}
export interface decodeJWT {
  exp: number;
  iat: number;
  name: string;
  user_id: string;
}
export interface userProfile{
  name:string,
  email:string,
  profession:string
  github:string
  twitter:string 
}