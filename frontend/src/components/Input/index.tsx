import React from 'react'
import style from "./style/Input.module.css"

interface props{
  children?:React.ReactNode;
  id:string;
  onChange?:React.ChangeEventHandler<HTMLInputElement>;
  value?:string
  type:React.HTMLInputTypeAttribute
}


function Input({id,children,onChange,type,value}:props) {
  return (
    <>
    <label className={style.label} htmlFor={id}>
          {children}
        </label>
        <div className={style.inputContainer}>
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
          />
        </div>
    </>
  )
}

export default Input