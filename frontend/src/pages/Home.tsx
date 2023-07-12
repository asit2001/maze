import { useEffect } from "react";
import style from "./styles/home.module.css";
import AddUser from "../components/AddUser";
import { getProfile, setShowModel, useAppDispatch, useAppSelector } from "../redux";
import Card from "../components/card";
function Home() {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(state=>state.profile.value);  
  useEffect(()=>{
      if (profiles.length===0) {
        dispatch(getProfile())
      }
    },[dispatch, profiles])

    function handelClick(){
      dispatch(setShowModel(true));
    }
  return (
    <div className={style.container}>
      <button onClick={handelClick} className={style.btn}>New Profile</button>
      <AddUser/>
      <div className={style.card__containers}>
        {
          profiles.map(data=><Card key={data._id} data={data}/>)
        }
      </div>
    </div>
  );
}

export default Home;
