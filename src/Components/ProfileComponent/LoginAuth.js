import {  useState } from "react";
import { Link } from "react-router-dom";
import { loginUser, registrationUser, setUser } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";

const LoginAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [login, setLogin] = useState(true)
    const dispatch = useDispatch()

    const loginChange = () => {
        setLogin(current => !current)
    }

    const handleLogin = () => {
        dispatch(loginUser({ email, password, fullName })).then((action) => {
            if (loginUser.fulfilled.match(action)) {
                dispatch(setUser((action.payload)));
            }
        });
    }

    return(
        <div className="loginRegistrationContainer">
            <div className="loginRegistration">
                <div>
                    <h1 className="titleLoginRegistration">{login ? "ВХОД" : "РЕГИСТРАЦИЯ"}</h1>
                </div>
                <div className={login ? "displayNone" : "inputContainer"} >
                    <label>Имя</label>
                    <input
                    type="text"
                    onChange={e => setFullName(e.target.value)}
                    value={fullName}
                    required/>
                </div>
                <div className="inputContainer">
                    <label>Почта</label>
                    <input 
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required/>
                </div>
                <div className="inputContainer">
                    <label>Пароль</label>
                    <input
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required/>
                </div>
                <div onClick={() => loginChange(!setLogin)} className="">
                    <p className="questionAboutRegistration">{login ? "Нет профиля? Регистрация!" : "Есть профиль!"}</p>
                </div>
                <div className="loginRegistrationBtnContainer">
                    {login ? 
                    <button onClick={handleLogin} className="loginRegistrationBtn">
                        <Link to='/'>Войти в профиль</Link>
                    </button>:
                    <button onClick={() => dispatch(registrationUser({email, password, fullName}))} className="loginRegistrationBtn">
                        <Link to='/'>Зарегистироваться</Link>
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default LoginAuth;