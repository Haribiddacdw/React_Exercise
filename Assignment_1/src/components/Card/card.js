import cardStyle from '../Card/card.module.css';
import { useNavigate } from "react-router-dom";
function Card(props){

    const navigate = useNavigate();

    const handleCardClick = (city) => {
        navigate(`/detailspage/${city.toLowerCase()}`);
     };
     
    return(
             <div key={props.key} className={cardStyle["column"]}>
                    <img src={require(`../../assets/images/${props.value.city.toLowerCase()}.png`)} alt={props.value.city} width="100%" />
                    <h3 className={cardStyle[`place-slogan`]}>
                     {props.value.place}
                    </h3>
                    <p className={cardStyle[`place-name`]}>{props.value.city}</p>
                    <p className={cardStyle[`place-description`]}>
                    {props.value.shortDescription}
                    </p>
                    <button className={cardStyle[`read-btn`]} onClick={()=>handleCardClick(props.value.city)}>READ MORE</button>
                  </div>
    )
}
export default Card;