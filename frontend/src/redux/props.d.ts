
type method =  "GET" | "DELETE" | "POST"

export interface LoginProps {
  email: string;
  password: string;
}
export interface RegisterProps extends LoginProps {
  name: string;
}
export type userInit = {
  name: string;
  loginError: string;
};
