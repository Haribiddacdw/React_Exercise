import axiosApi from "axios";
import DetailsPageStyle from "../components/DetailedDestination/detaildestination.module.css";
const apiRoute = "https://nijin-server.vercel.app/api/explorer";

 const fetchData = async(route="") => {
       let res = await axiosApi.get(`${apiRoute}${route}`);
       return res.data;

}

 const weatherData = async(placeName="") => {
    let res = await axiosApi.get(`http://api.weatherapi.com/v1/forecast.json?key=db224014a65b48d987f181930231404&q=${placeName}&days=1&aqi=no&alerts=yes;`);
    let weather = res.data.current.temp_c +" ℃";
    return weather;
}

const fullDescriptionData =  async(route="") => {
    let res = await axiosApi.get(`${apiRoute}${route}`);
    let fullDescription = res.data.fullDescription.split("\\n").map((el,index)=><p key={index} className={DetailsPageStyle["place-fulldetail-description"]}>{el}</p>);
    return fullDescription;
}

const getCities =  async() => {
    let res = await axiosApi.get(apiRoute);
    const cities = res.data.map((details) => details.city);
    return cities;
}

export  default fetchData;
export {weatherData,fullDescriptionData,getCities};