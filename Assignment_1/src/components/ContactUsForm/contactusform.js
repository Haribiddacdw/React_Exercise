import { useEffect, useState } from "react";
import contactFormStyle from "./contact.module.css";
import PropTypes from "prop-types";
import { getCities } from "../../services/apiServices";
import Dropdown from "../Dropdown/dropdown";
import Button from "../Button/button";
function ContactUsForm() {

  const [name, setName] = useState("");
  const [hometown, setHometown] = useState("");
  const [interestedArea, setInterestedArea] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [username, setUsername] = useState("");
  const [enteredHometown, setEnteredHometown] = useState("");
  const [enteredInterestedArea, setEnteredInterestedArea] = useState("");

  const [options, setOptions] = useState([]);
  const [interestedAreaOptions, setInterestedAreaOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setOptions(await getCities());
    };
    fetch();
  }, []);

  const setOptions2 = (city) => {

    var filteredArray = options.filter((e) => e !== city);
    setInterestedAreaOptions(filteredArray);
  };

  const handleFormClick = () => {
    if (
      name !== "" &&
      hometown !== "" &&
      interestedArea !== "" &&
      contactNumber !== ""
    ) {
      setIsValid(true);
      setUsername(name);
      setEnteredHometown(hometown);
      setEnteredInterestedArea(interestedArea);
    }
  };

  function handleDropdown(event) {
    setHometown(event.target.value);
    setOptions2(event.target.value);
  }

  return (
    <>
      <section className={contactFormStyle["contact-form-section"]}>
        <div className={contactFormStyle["contact-form-container"]}>
          <div className={contactFormStyle["contact-head"]}>
            <h2 className={contactFormStyle["contact-intro"]}>Contact Us</h2>
            <p className={contactFormStyle["contact-intro-slogan"]}>
              Our Sales Team will reach out to you ASAP!
            </p>
          </div>

          <form className={contactFormStyle["input-box-container"]}>
            <div className={contactFormStyle["input-box"]}>
              <label for="name" className={contactFormStyle["label"]}>
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className={contactFormStyle["explore-form-select"]}
              />
            </div>

            <div className={contactFormStyle["input-box"]}>
              <label for="dropdown" className={contactFormStyle["label"]}>
                Your Home Town
              </label>
              <Dropdown onChangeName={handleDropdown} data={{options,hometown}}/>
              
            </div>

            <div className={contactFormStyle["input-box"]}>
              <label for="dropdown" className={contactFormStyle["label"]}>
                Where would you Like to Go?
              </label>
              <Dropdown onChangeName={(e) => setInterestedArea(e.target.value)} data={{interestedAreaOptions,interestedArea}}/>
            </div>

            <div className={contactFormStyle["input-box"]}>
              <label for="contactnumber" className={contactFormStyle["label"]}>
                Contact Number
              </label>
              <input
                id="contactnumber"
                type="number"
                className={contactFormStyle["explore-form-select"]}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <Button onChangeName={handleFormClick} text="SUBMIT INTEREST"/>
            {/* <button
              type="button"
              onClick={handleFormClick}
              className={contactFormStyle["contact-form-button"]}
            >
              SUBMIT INTEREST
            </button> */}
          </form>

          {isValid ? (<FormMessage name={username} source={enteredHometown} destination={enteredInterestedArea}/>) 
          :(<div></div>)}

        </div>
      </section>
    </>
  );
}
export default ContactUsForm;

function FormMessage(props) {
  const { name, source, destination } = props;
  return (
    <div className={contactFormStyle["form-message"]}>
      Thank You {name} For expressing Interest in Traveling with us. Our Sales
      Team will get back with the best Packages From {source} to {destination}.
    </div>
  );
}
FormMessage.propType = {
  name: PropTypes.string,
  source: PropTypes.string,
  destination: PropTypes.string,
};

FormMessage.defaultProps = {
  name: "NAME_DEMO",
  source: "SOURCE",
  destination: "DESTINATION",
};
