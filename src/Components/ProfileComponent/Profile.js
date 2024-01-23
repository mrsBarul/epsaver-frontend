import { useState, useEffect } from "react";
import Logout from "./Logout";
import AvatarImage from './AvatarImage'
import { getUserData } from "../../Redux/authSlice";
import { useSelector } from "react-redux";
import UpdateCollection from "../CollectionComponent/UpdateCollection";
import ShareCollection from "../CollectionComponent/ShareCollection";


const Profile = ({ activeProfile }) => {

    const userData = useSelector(getUserData);
    const {email, fullName} = userData.user;

    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * AvatarImage.length)
        return AvatarImage[randomIndex]
    }

    const [avatarUser, setAvatarUser] = useState(getRandomAvatar());

    useEffect(() => {
    const interval = setInterval(() => {
        const newAvatar = getRandomAvatar();
        setAvatarUser(newAvatar);
    }, 60000);

    return () => clearInterval(interval);
}, []);

    return (
            <div className="containerUser">
                <div className="avatarContainer">
                    <div className="avatarUser">
                        <img className='user' src={avatarUser} alt="user"/>
                    </div>
                    <div className="profileBtn">
                        <p>ПРОФИЛЬ</p>
                    </div>
                </div>
                { activeProfile ? 
                <ul className="profileInfo">
                    <li>{fullName.toUpperCase()}</li>
                    <li>{email.toUpperCase()}</li>
                    <UpdateCollection/>
                    <ShareCollection/>
                    <Logout/>
                </ul> : ""}
            </div>
        )
}

export default Profile;