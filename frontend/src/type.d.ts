
export interface decodeJWT {
  exp: number;
  iat: number;
  key: string;
  name: string;
  user_id: string;
  email: string;
}
export interface userProfile{
  name:string,
  email:string,
  profession:string
  github:string
  twitter:string 
}
export interface ResProfile extends userProfile{
  _id:string
}