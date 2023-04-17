import { useState, useEffect } from "react";
import destinationStyle from "../Destination/destination.module.css";
import DetailsPageStyle from "./detaildestination.module.css";
import Card from "../Card/card"
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function DetailsDestinationPage() {
  return (
    <>
      <DetailSection />
      <SimilarDestinations />
    </>
  );
}
export default DetailsDestinationPage;

function DetailSection() {
  const placeName = window.location.pathname.replace("/detailspage/","").toLowerCase();
  const apiUrl = `https://nijin-server.vercel.app/api/explorer/places/${placeName}`;
  const [completeDetail, setCompleteDetail] = useState({});
  const[fullDescription,setFullDescription] = useState("");
  const[wheather,setWheather] = useState("");
  
  useEffect(() => {

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCompleteDetail(data);
       
        setFullDescription(data.fullDescription.split("\\n").map((el,index)=><p key={index} className={DetailsPageStyle["place-fulldetail-description"]}>{el}</p>));
      });
      
      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=db224014a65b48d987f181930231404&q=${placeName}&days=1&aqi=no&alerts=yes`)
    .then(function (response) {
      console.log(response.data.current.temp_c);
      setWheather(response.data.current.temp_c+" ℃")
    })
    .catch(function (error) {
      console.log(error);
    });

  }, []);
  

  return (
    <>
    {
      Object.entries(completeDetail).length>0 &&
      <section className={DetailsPageStyle["promo-section"]}>
        <div className={DetailsPageStyle["promo-content"]}>
          <p className={DetailsPageStyle["promo-content-placename"]}>
            {completeDetail.city}
          </p>
          <div className={DetailsPageStyle["promo-content-place-slogan"]}>
            {completeDetail.place}
          </div>
          <p className={DetailsPageStyle["promo-content-place-temperature"]}>
            {wheather}
          </p>
        </div>

        <div className={DetailsPageStyle["cover"]}>
          <img src={require(`../../assets/images/${completeDetail.city.toLowerCase()}.png`)} alt="promoImage"></img>
        </div>
      </section>
      }
      <section>
        <div className={DetailsPageStyle["place-fulldetail-container"]} style={{"white-space":"pre-wrap"}}>
          {fullDescription}
        </div>
      </section>
    </>
  );
}

function SimilarDestinations() {

  const placeName = window.location.pathname.replace("/detailspage/","").toLowerCase();
  const apiUrlAllDetails = "https://nijin-server.vercel.app/api/explorer";
  const apiUrlSimilarPlaces = `https://nijin-server.vercel.app/api/explorer/places/related/${placeName}`;
  const [similarplaces, setSimilarPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    fetch(apiUrlAllDetails)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (places.join("") !== data.join("")) setPlaces(data);
      });
  }, [places]);

  useEffect(() => {
    fetch(apiUrlSimilarPlaces)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (similarplaces.join("") !== data.join("")) setSimilarPlaces(data);
      });
  });

  let filteredArray2 = places.filter(function (obj) {
    return similarplaces.includes(obj["city"]);
  });


  return (
    <>
     {
      Object.entries(filteredArray2).length>0 &&
      <section>
        <div className={destinationStyle["destination-container"]}>
          <div className={destinationStyle["destination-head"]}>
            <h2 className={destinationStyle["destination-intro"]}>
              Similar Destinations
            </h2>
            <p className={destinationStyle["destination-intro-slogan"]}>
              Because you liked {placeName}
            </p>
          </div>
          <div className={destinationStyle["cards-container"]}>
            {filteredArray2.map((v, i) => {
              return (
                <Card value={v} key={i}/>
              );
            })}
          </div>
        </div>
      </section>
}
    </>
  );
}
