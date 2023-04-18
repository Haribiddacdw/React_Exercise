import { useState,useEffect } from "react";
import peStyle from "./promoandexplore.module.css";
import { useNavigate } from "react-router-dom";
import {getCities} from "../../services/apiServices";
import Cover from "../../assets/images/cover.webp"
function PromoAndExplore() {

  const navigate = useNavigate();
  const [options,setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetch  = async() =>{
      let cities = await getCities();
      if(cities.join("") !== options.join("")) 
       setOptions(cities); 
    }
    fetch();
 }, [options]);

  const handleFormClick = () => {

    if(selectedOption!==""){
      navigate(`/detailspage/${selectedOption}`);
    }
  };

  console.log("promo")

  return (
    <>
      <section className={peStyle["promo-section"]}>
        <div className={peStyle["promo-content"]}>
          <p className={peStyle["promo-content-text1"]}>WELCOME TO EXPLORER</p>
          <p className={peStyle["promo-content-text2"]}>
            Your Adventure Travel Expert in the{" "}
            <span className={peStyle["south"]}>SOUTH</span>
          </p>
          <div className={peStyle["explore-form"]}>
            <select
              className={peStyle["explore-form-select"]}
              id="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Choose</option>
              {options.map((v, i) => {
                   return (
                  <option value={v}>{v}</option>
              );
            })}
            </select>
          </div>
          <button
            type="button"
            onClick={handleFormClick}
            className={peStyle["explore-form-button"]}
          >
            EXPLORE
          </button>
        </div>

        <div className={peStyle["cover"]}>
          <img src={Cover} alt="promoImage"></img>
        </div>
      </section>
    </>
  );
}
export default PromoAndExplore;
