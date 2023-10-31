import { Link } from 'react-router-dom';
import logo from '../../logo.png'
import LoginAuth from "../ProfileComponent/LoginAuth";

const ChoiceAuth = () => {
    return(
        <div className="AuthContainer">
            <div className='header'>
                <div className='logoHeader'>
                    <Link to='/'>
                        <img className='logoImage' src={ logo }  alt="logo"/>
                    </Link>
                </div>
                <div >
                    <button className='btnToPage'>
                        <Link to='/'>Главная страница</Link>
                    </button>
                </div>
            </div>
            <div className="loginRegistrationAuthContainer">
                <LoginAuth/>
            </div>
        </div>
    )
}

export default ChoiceAuth;