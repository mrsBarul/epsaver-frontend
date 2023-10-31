import { useDispatch } from "react-redux";
import { filterSerial } from "../../Redux/filterSlice";


const Buttons = ({ status }) => {

    const dispatch = useDispatch()


    return(
            <div className="buttonItems">
                <button className="btnCategory" onClick={() => dispatch(filterSerial(status))}>{ status} </button>
            </div>
    )
}

export default Buttons;

