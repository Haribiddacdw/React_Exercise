import { useState, useEffect } from "react";
import destinationStyle from "../Destination/destination.module.css";
import DetailsPageStyle from "./detaildestination.module.css";
import Card from "../Card/card"
import fetchData,{weatherData,fullDescriptionData} from "../../services/apiServices";
import { useParams } from "react-router-dom";


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

  const  placeName  = useParams().userId;
  const apiUrl = `/places/${placeName}`;
  const [completeDetail, setCompleteDetail] = useState({});
  const[fullDescription,setFullDescription] = useState("");
  const[weather,setWeather] = useState("");
  
  useEffect(() => {
     const fetch  = async() =>{
      let completeDetails = await fetchData(apiUrl); 
      console.log(completeDetails);
      if(completeDetails !== completeDetail) {
        setCompleteDetail(completeDetails);
        setFullDescription(await fullDescriptionData(apiUrl))
        setWeather(await weatherData(placeName));
      }
     }
     fetch();
  },[placeName]);
  

  console.log("destination");
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
            {weather}
          </p>
        </div>

        <div className={DetailsPageStyle["cover"]}>
          <img src={require(`../../assets/images/${completeDetail.city.toLowerCase()}.png`)} alt="promoImage"></img>
        </div>
      </section>
      }
      <section>
        <div className={DetailsPageStyle["place-fulldetail-container"]}>
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
