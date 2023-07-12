import { ResProfile } from "../../type";
import style from "./style/card.module.css";
import { FaTwitter, FaGithub } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
function Card({data}: {data:ResProfile}) {
    const gitUserName = new URL(data.github).pathname.replaceAll("/","");
    let url = "https://avatars.githubusercontent.com/"
    
  return (
    <div className={style.card}>
      <img
        className={style.card__img}
        src={url+gitUserName}
        alt="profile"
      />
      <h2 className={style.card__name}>{data.name}</h2>
      <h4 className={style.card__profession}>{data.profession}</h4>
      <div className={style.icons}>
        <a target="_blank" href={data.email} rel="noreferrer">
          <MdOutlineEmail className={style.icon}/>
        </a>
        <a target="_blank" href={data.github} rel="noreferrer">
          <FaGithub className={style.icon}/>
        </a>
        <a target="_blank" href={data.twitter} rel="noreferrer">
          <FaTwitter className={style.icon}/>
        </a>
      </div>
    </div>
  );
}

export default Card;
