import cardStyle from '../Card/card.module.css';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Card(props){

    const navigate = useNavigate();
    const handleCardClick = (city) => {
        navigate(`/detailspage/${city.toLowerCase()}`);
     };
     
    return(
             <div className={cardStyle["column"]}>
                  <div>
                    <img src={require(`../../assets/images/${props.value.city.toLowerCase()}.png`)} alt={props.value.city} width="100%" />
                    <h3 className={cardStyle[`place-slogan`]}>
                     {props.value.place}
                    </h3>
                    <p className={cardStyle[`place-name`]}>{props.value.city}</p>
                    <p className={cardStyle[`place-description`]}>
                    {props.value.shortDescription}
                    </p>
                    </div> 
                    <button className={cardStyle[`read-btn`]} onClick={()=>handleCardClick(props.value.city)}>READ MORE</button>
                  </div>
    )
}

Card.propType={
    city : PropTypes.string,
    place: PropTypes.string,
    shortDescription : PropTypes.string,
  }

Card.defaultProps = {
    city: "TamilNadu_Places"
}  

export default Card;