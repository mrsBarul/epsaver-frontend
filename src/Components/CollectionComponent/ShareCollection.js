import { useSelector } from "react-redux";
import { getIsAuthenticated, getUserData } from "../../Redux/authSlice";
import { useState } from "react";

const ShareCollection = () => {

  const [collectionLink, setCollectionLink] = useState('');
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userData = useSelector(getUserData);
  const userId = userData.user.id;

  const handleShare = () => {
    if (isAuthenticated && userData && userData.user && userData.user.isActivated) {
      const collectionUserUrl = `/collection/${userId}`;
      setCollectionLink(collectionUserUrl);
      window.location.href = collectionLink
    } else {
      window.location.href = '/ChoiceAuth'
    }
  };

  return (
      <button onClick={ handleShare } className="updateShare buttonUpdateShare">
        ПОДЕЛИТЬСЯ КОЛЛЕКЦИЕЙ
      </button>
  );
}

export default ShareCollection;