import Style from './dropdown.module.css'

function Dropdown(props){

    let places = props.data.hometown || props.data.interestedArea || "";
    let options = props.data.options || props.data.interestedAreaOptions || [];

    return(
        <>
        <select
                id="dropdown"
                value={places}
                onChange={(e)=>{
                    props.onChangeName(e)
                }}
                className={`${Style["explore-form-select"]}  ${Style["choose-icon"]}`}
              >
                <option value="">Choose</option>
                {options.map((v, i) => {
                    
                  return <option value={v}>{v}</option>;
                })}
              </select>
        </>
    )
}
export default Dropdown;