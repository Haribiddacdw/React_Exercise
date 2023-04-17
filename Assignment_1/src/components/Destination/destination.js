import { useState,useEffect} from "react";
import destinationStyle from "./destination.module.css";
import { useNavigate } from "react-router-dom";
import Card from "../Card/card";
function Destinations() {
  return (
    <>
      <section className={destinationStyle["destination-section"]}>
        <div className={destinationStyle["destination-container"]}>

          <div className={destinationStyle["destination-head"]}>
            <h2 className={destinationStyle["destination-intro"]}>Destinations</h2>
            <p className={destinationStyle["destination-intro-slogan"]}>Just For You.Because you and your bike are special to us!</p>
          </div>
          
          <section className={destinationStyle["cards-section"]}>
          <div id={destinationStyle["main-div"]}>
            <Cards/>
          </div>
        </section>

        </div>
      </section>
    </>
  );
}
export default Destinations;

function Cards (){

    const[places,setPlaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetch("https://nijin-server.vercel.app/api/explorer")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if(places.join("") !== data.join(""))
          setPlaces(data)
      });
    },[places]);
  
    return(
      <>
      <section className={destinationStyle["cards-container"]}>
            {places.map((v, i) => {
              return (
               <Card value={v} key={i}/>
              );
            })}
      </section>
      </>
    )
  }