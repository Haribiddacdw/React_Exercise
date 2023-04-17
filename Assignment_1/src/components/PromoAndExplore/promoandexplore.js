import { useState } from "react";
import peStyle from "./promoandexplore.module.css";
import { useNavigate } from "react-router-dom";
import Cover from "../../assets/images/cover.webp"
function PromoAndExplore() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleFormClick = () => {
    console.log("handleFormClick");
    console.log(selectedOption, "State CLICKED METHOD");
    if(selectedOption!==""){
      navigate(`/detailspage/${selectedOption}`);
    }
  };

  return (
    <>
      <section className={peStyle["promo-section"]}>
        <div className={peStyle["promo-content"]}>
          <p className={peStyle["promo-content-text1"]}>WELCOME TO EXPLORER</p>
          <p className={peStyle["promo-content-text2"]}>
            YOUR ADVENTURE TRAVEL EXPERT IN THE{" "}
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
              <option value="Pollachi">Pollachi</option>
              <option value="Thanjavur">Thanjavur</option>
              <option value="Chidambaram">Chidambaram</option>
              <option value="Masinagudi">Masinagudi</option>
              <option value="Kumbakonam">Kumbakonam</option>
              <option value="Tirunelveli">Tirunelveli</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleFormClick}
            className={peStyle["explore-form-button"]}
          >
            {" "}
            Explore{" "}
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

// const languageList = [
//   { value: 1, label: "Pollachi" },
//   { value: 2, label: "Thanjavur" },
//   { value: 3, label: "Chidambaram" },
//   { value: 4, label: "Masinagudi" },
//   { value: 4, label: "Kumbakonam" },
//   { value: 6, label: "Tirunelveli" },
// ];
