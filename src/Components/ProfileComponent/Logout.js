import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "../../Redux/authSlice";
import exit from '../../exit.png';

const Logout = () => {
    
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logoutUser()).then((action) => {
            if (logoutUser.fulfilled.match(action)) {
                dispatch(setUser(null));
            }
        });
    };

    return (
        <button onClick={handleLogout} className="logoutButton">
            <img src={exit} className="exit" alt="exit"/>
        ВЫЙТИ
        </button>
    );
};

export default Logout;