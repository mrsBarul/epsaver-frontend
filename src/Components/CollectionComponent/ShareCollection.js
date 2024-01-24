import { jsPDF } from 'jspdf';
import { getAllSerials } from '../../Fetch/FetchSerial';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserData } from '../../Redux/authSlice';
import  Roboto from "./fonts/Roboto.ttf"

const ShareCollection = () => {
  const [allSerials, setAllSerials] = useState([]);
  console.log(allSerials)
  const userData = useSelector(getUserData);
  const userId = userData.user.id;

  const shareCollection = async () => {

        getAllSerials(setAllSerials, userId);
        
        const pdf = new jsPDF();
        let yPos = 20;

        pdf.addFileToVFS("Roboto.ttf", Roboto);
        pdf.addFont("Roboto.ttf", "Roboto", "normal");
        pdf.setFont("Roboto");
        pdf.text("Привет!", 100, 10);

      allSerials.forEach((serial, index) => {
        if (serial.poster) {
          const imgData = serial.poster; 
          pdf.addImage(imgData, 'JPEG', 20, yPos, 50, 50);
        } else return undefined


        const title = serial.title;
        const series = serial.series;
        const episode = serial.episode;
        const status = serial.status;
        const raiting = serial.raiting;
        const comment = serial.comment;
        console.log(title)

        pdf.text("Привет", 20, 20)
        pdf.text(title, 80, yPos + 10);
        pdf.text(`Серия: ${ series } Эпизод: ${ episode }`, 80, yPos + 20);
        pdf.text(`Статус: ${status}`, 80, yPos + 30);
        pdf.text(`Рейтинг: ${raiting}`, 80, yPos + 40);
        pdf.text(`Комментарий: ${ comment }`, 80, yPos + 50);

        // Увеличиваем Y позицию для следующего сериала
        yPos += 60;

        // Добавляем отступ между сериалами
        if (index < allSerials.length - 1) {
          yPos += 10;
        }
      });

      // Сохраняем PDF
      pdf.save('serials_collection.pdf');
    
  };

  useEffect(() => {
    getAllSerials(setAllSerials, userId);
  }, [setAllSerials, userId]);

  return (
      <button onClick={shareCollection} className="updateShare buttonUpdateShare">
        ПОДЕЛИТЬСЯ КОЛЛЕКЦИЕЙ
      </button>
  );
}

export default ShareCollection;