import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import style from "./style/addUser.module.css";
import { Toaster, toast } from "react-hot-toast";
import { addProfile, setShowModel, useAppDispatch, useAppSelector } from "../../redux";
import { useOutsideClick } from "../hooks";

function AddUser() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");

    const ref = useRef(null);
    const {error,showModel} = useAppSelector(state=>state.profile)

    useEffect(() => {
        if (error) {
          toast.error(error, {
            position: "bottom-center",
            duration: 3000,
          });
        }
      }, [error]);

      useOutsideClick(ref,()=>{
        dispatch(setShowModel(false))
      })

  function save(e: React.FormEvent) {
    e.preventDefault();
    dispatch(addProfile({ email, github, name, profession, twitter })).then(({meta})=>{
        if (meta.requestStatus==="fulfilled") {
            setEmail("");
            setGithub("");
            setName("");
            setProfession("");
            setTwitter("");
            dispatch(setShowModel(false));
        }
    })
  }

  return (<div className={style.container} style={{display:showModel?"flex":"none"}}>
    <form ref={ref} className={style.form}>
      <h2 className={style.title}>Person's Details</h2>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        >
        name
      </Input>
      <Input
        id="profession"
        type="text"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      >
        profession
      </Input>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        >
        email
      </Input>
      <Input
        id="github"
        type="text"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      >
        GitHub Profile
      </Input>
      <Input
        id="twitter"
        type="text"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
        >
        Twitter Profile
      </Input>
      <button onClick={save} className={style.btn}>
        Save
      </button>
      <Toaster />
    </form>
    </div>
  );
}

export default AddUser;
