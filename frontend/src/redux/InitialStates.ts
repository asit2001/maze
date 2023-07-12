
import { ResProfile } from "../type";
import { decodeTokenFromCookie } from "../utils";
import { userInit } from "./props";


export const userInitialState : userInit= {
  name : decodeTokenFromCookie("jwtToken")?.name ||"",
  loginError:"",
}
export const profilesInitialState= {
  value : [] as ResProfile[],
  error: "",
  showModel:false
}