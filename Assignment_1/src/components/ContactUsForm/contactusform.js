import { useEffect, useState } from "react";
import contactFormStyle from "./contact.module.css";
import PropTypes from "prop-types";
import {getCities} from "../../services/apiServices";

function ContactUsForm() {

  const [name, setName] = useState("");
  const [hometown, setHometown] = useState("");
  const [interestedArea, setInterestedArea] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isValid,setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [options,setOptions] = useState([]);
  const [interestedAreaOptions,setInterestedAreaOptions] = useState([]);

  useEffect(() => {
    const fetch  = async() =>{
       setOptions(await getCities()); 
    }
    fetch();
 }, []);

const setOptions2 =(city) => {
  var filteredArray = options.filter(e => e !== city)
  setInterestedAreaOptions(filteredArray);
};

  const handleFormClick = () => {

    if(name!=="" && hometown!=="" && interestedArea!=="" && contactNumber!==""){
      setIsValid(true);
      setUsername(name);
    }
  };
  
  function handleDropdown(event){
     setHometown(event.target.value)
     setOptions2(event.target.value)
  }
  return (
    <>
      <section className={contactFormStyle["contact-form-section"]}>
        <div className={contactFormStyle["contact-form-container"]}>
          <div className={contactFormStyle["contact-head"]}>
            <h2 className={contactFormStyle["contact-intro"]}>
              Contact Us
            </h2>
            <p className={contactFormStyle["contact-intro-slogan"]}>
              Our Sales Team will reach out to you ASAP!
            </p>
          </div>

          <div className={contactFormStyle["input-box-container"]}>
            <div className={contactFormStyle["input-box"]}>
              <label htmlFor="options" className={contactFormStyle["label"]}>Name</label>
              <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                className={contactFormStyle["explore-form-select"]}
              />
            </div>
           
            <div className={contactFormStyle["input-box"]}>
              <label htmlFor="options" className={contactFormStyle["label"]}>Your Home Town</label>
              <select
                id="options"
                value={hometown}
                onChange={handleDropdown}
                className={`${contactFormStyle["explore-form-select"]}  ${contactFormStyle["choose-icon"]}`}
              >
                <option value="">Choose</option>
                {options.map((v, i) => {
                   return (
                  <option value={v} key={i}>{v}</option>
              );
            })}

              </select>
            </div>

            <div className={contactFormStyle["input-box"]}>
              <label htmlFor="options" className={contactFormStyle["label"]}>Where would you Like to Go?</label>
              <select
                id="options"
                value={interestedArea}
                onChange={(e) => setInterestedArea(e.target.value)}
                className={`${contactFormStyle["explore-form-select"]}  ${contactFormStyle["choose-icon"]}`}
              >
              <option value="">Choose</option>
                {  
                 interestedAreaOptions.map((v, i) => {
                   return (
                   <option value={v}>{v}</option>
                );
            })}
              </select>
            </div>

            <div className={contactFormStyle["input-box"]}>
              <label htmlFor="options" className={contactFormStyle["label"]}>Contact Number</label>
              <input
                type="number"
                className={contactFormStyle["explore-form-select"]}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            
            <button type="button" onClick={handleFormClick} className={contactFormStyle["contact-form-button"]}> 
            SUBMIT INTEREST
            </button>
          </div>

           {isValid ? (<FormMessage name={username} source={hometown} destination={interestedArea}/>)
           : <div></div>
           }
        
        </div>
      </section>
    </>
  );
}
export default ContactUsForm;


function FormMessage(props){
  const{name,source,destination} = props;
 return(
  <div className={contactFormStyle["form-message"]}>
   Thank You {name} For expressing Interest in Traveling with us. Our Sales Team will get back with the best Packages
   From {source} to {destination}.
  </div> 
  )
}

FormMessage.propType={
  name : PropTypes.string,
  source: PropTypes.string,
  destination : PropTypes.string,
}

FormMessage.defaultProps = {
  name : "NAME_DEMO",
  source: "SOURCE",
  destination : "DESTINATION",
} 