import './App.css';
import ChoiceAuth from './Components/MainPageComponent/ChoiceAuth';
import MainPage from './Components/MainPageComponent/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getIsAuthenticated, getUserData } from './Redux/authSlice';
import CollectionPage from '../src/Components/CollectionComponent/CollectionPage';



function App() {

    const isAuthenticated = useSelector(getIsAuthenticated);
    const userData = useSelector(getUserData);



    if (isAuthenticated && userData && userData.user && userData.user.isActivated) {
        return (
            <div className="App">
                <CollectionPage/>
            </div>
        );
    }
    else {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/ChoiceAuth" element={<ChoiceAuth />} />
                    </Routes>
                </div>
            </Router>
        );
    }
    }

export default App;
