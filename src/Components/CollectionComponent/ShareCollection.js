import { jsPDF } from 'jspdf';
import { getAllSerials } from '../../Fetch/FetchSerial';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../Redux/authSlice';
import Collection from './Collection';

const ShareCollection = () => {

    const [ allSerials, setAllSerials ] = useState([])
    const userData = useSelector(getUserData)
    const userId = userData.user.id;

    const shareCollection = () => {
        const pdf = new jsPDF();
        {allSerials.length > 0 ? allSerials.map(serial => pdf.text(
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

        pdf.save('serials_collection.pdf');
    }

    useEffect(() => {
        getAllSerials(setAllSerials, userId)
    }, [setAllSerials, userId])

    return (
        <button onClick={ shareCollection }
        className="updateShare buttonUpdateShare">
            ПОДЕЛИТЬСЯ КОЛЛЕКЦИЕЙ
        </button>
    )
}

export default ShareCollection;