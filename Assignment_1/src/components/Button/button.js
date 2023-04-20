import Style from "./button.module.css";

function Button(props) {

   let className="";
    if(props.text==="EXPLORE"){
        className = "explore-form-button";
    }else if(props.text==="SUBMIT INTEREST"){
        className = "contact-form-button";
    }else if(props.text==="READ MORE"){
        className = "read-btn";
    }

  return (
    <button
      type="button"
      onClick={(e)=>{
        props.onChangeName(e)
    }}
      className={Style[className]}
    >
      {props.text}
    </button>
  );
}
export default Button;
