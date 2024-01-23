import ReactToPdf from 'react-to-pdf';
import { getAllSerials } from '../../Fetch/FetchSerial';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../Redux/authSlice';
import Collection from './Collection';

const ShareCollection = () => {

    const [ allSerials, setAllSerials ] = useState([])
    console.log(allSerials)
    const userData = useSelector(getUserData)
    const userId = userData.user.id;

    const ref = useRef();

    const options = {
      filename: 'serials_collection.pdf',
      orientation: 'portrait',
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const shareCollection = async () => {
        try {
          const serials = await getAllSerials(userId);
          setAllSerials(serials);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };
    
      useEffect(() => {
        shareCollection();
      }, []);

    return (
        <div>
      <button onClick={shareCollection} className="updateShare buttonUpdateShare">
        ПОДЕЛИТЬСЯ КОЛЛЕКЦИЕЙ
      </button>

      {allSerials.length > 0 && (
        <ReactToPdf targetRef={ref} options={options} x={0.5} y={0.5} scale={0.8}>
          {({ toPdf }) => (
            <button onClick={toPdf} className="updateShare buttonUpdateShare">
              СОХРАНИТЬ В PDF
            </button>
          )}
        </ReactToPdf>
      )}

      <div ref={ref}>
      <div className='collection'>
    
                {allSerials.length > 0 ? allSerials.map(serial => (
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
    </div>
    )
}

export default ShareCollection;