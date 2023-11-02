import logo from '../../Image/logo.png';
import Search from '../SearchComponent/Search';
import Collection from './Collection'
import { useSelector } from 'react-redux';
import { getStatus } from '../../Redux/filterSlice';
import { getSearchWord } from '../../Redux/searchSlice';
import SearchCard from '../SearchComponent/SearchCard';
import { useEffect, useState, useRef  } from "react";
import { getAllSerials } from "../../Fetch/FetchSerial";
import Filter from '../ButtonComponent/Filter';
import Profile from '../ProfileComponent/Profile';
import { getUserData } from '../../Redux/authSlice';
import FilterModal from '../ModalComponents/FilterModal';


const CollectionPage = () => {

    const userData = useSelector(getUserData);
    const statusSerial = useSelector(getStatus);
    const searchWord = useSelector(getSearchWord);
    const [activeProfile, setActiveProfile] = useState(false);
    const [allSerials, setAllSerials] = useState([]);
    const userId = userData.user.id;
    const profileRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);

    const checkWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        getAllSerials(setAllSerials, userId)
        window.addEventListener('resize', checkWidth)

        function handleClickOutside(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setActiveProfile(false);
            }
        }
            if (activeProfile) {
            document.addEventListener('click', handleClickOutside);
            } return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [setAllSerials, userId, activeProfile])


    return(
        <div className='headerContainer'>
            <div className='header'>
                <div className='logoHeader' >
                    <img className='logoHeaderImage' src={ logo }  alt="logo"/>
                </div>
                <div>
                    <Search setAllSerials={ setAllSerials }/>
                </div>
                <div ref={profileRef} className='profile'
                onClick={() => setActiveProfile(!activeProfile)}>
                    <Profile  activeProfile={ activeProfile }/>
                </div>
            </div>
            <div className='buttonFilter'>
                <SearchCard/>
                {width <= 550 ? 
                <div className='filterModalBtnContainer'>
                    <FilterModal/>
                    <button className='filterModalBtn'>ФИЛЬТР</button>
                </div> 
                : <Filter/> }
            </div>
            <div className='collection'>
                {allSerials.length > 0 ? allSerials.filter(serial => {
                    if(statusSerial === "ВСЕ") return true 
                    else if (searchWord === "") return statusSerial === serial.status
                    return serial.title.toLowerCase().includes(searchWord)}).map(serial => (
                    <Collection key={serial._id} 
                    id={serial._id}
                    title={ serial.title }
                    translate={ serial.translate }
                    series={ serial.series }
                    episode={ serial.episode }
                    status={ serial.status }
                    poster={serial.poster}
                    raiting={serial.raiting}
                    comment={serial.comment}
                    newSeason={serial.newSeason}
                    setAllSerials={ setAllSerials }
                    />
                    )): 
                <div className='emptyCollection'>
                    <p>Ваша коллекция пуста!</p>
                </div>}
            </div>
        </div>
    )
}

export default CollectionPage;
