import MainPageSlides from './MainPageSlide';
import logo from "../../Image/logo.png";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getUserData } from '../../Redux/authSlice';
import { useSelector } from 'react-redux';


const MainPage = () => {

    const userData = useSelector(getUserData);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleShowAlert = () => {
        Swal.fire({
            title: 'Авторизация!',
            html:'<p class="checkMail">Проверь почту, <br>' +
                'там для тебя письмо <br>' +
                'с ссылкой для авторизации <br>' +
                'профиля </p>',
            showCancelButton: true, 
            cancelButtonText: 'ОТМЕНА', 
            showConfirmButton: true, 
            confirmButtonText: 'OK',
            
            customClass: {
                title: 'auth',
                html: 'html',
                cancelButton: 'сancel',
                confirmButton: 'confirm',
                popup: 'custom-popup-class',
            }, 
            buttonsStyling: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/ChoiceAuth";
            }
        });
    };
    

    useEffect(() => {
        if (userData && userData.user && !userData.user.isActivated) {
            const time = setTimeout(() => {
                handleShowAlert();
            }, 800)
            return () => clearInterval(time);
        }
        
    }, [userData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => {
            if (prevSlide === MainPageSlides.length - 1) {
                return 0;
            } else {
                return prevSlide + 1;
            }
            });
        }, 4000);

        return () => clearInterval(interval);
        }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const slideStyles = {
      transform: `translateX(-${currentSlide * 100}%)`,
    };

    return (
    <div className="MainPageContainer">
        <div className="logoLoginContainer">
        <div className="logo">
            <img className="logoImage" src={logo} alt="logo" />
        </div>
        <div>
            <button className="login">
                <Link className='loginLink' to="/ChoiceAuth">Войти в профиль</Link>
            </button>
        </div>
        </div>
        <div className="slides-container">
            <div className='slides' style={slideStyles}>
            {MainPageSlides.map((slide, index) => (
                <div key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                <div className="description">
                    <p><b className='epsaver'>{slide.title}</b> {slide.description}</p>
                </div>
                <div className="slideImageContainer">
                    <img className="slideImage" src={slide.image} alt="boxPopCorn" />
                </div>
                </div>
            ))}
            </div>
            <div className="indicators">
                {MainPageSlides.map((_, index) => (
                    <div
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active-indicator' : ''}`}
                    onClick={() => goToSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    </div>
)
}

export default MainPage;



