import { useSelector } from "react-redux";
import { getUserData } from "../../Redux/authSlice";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from "react";
import { getAllSerials } from "../../Fetch/FetchSerial";

const ShareCollection = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const [allSerials, setAllSerials] = useState([]);
  const userData = useSelector(getUserData);
  const userId = userData.user.id;

  const handleShare = async () => {
    const documentDefinition = {
      content: [
        { text: 'Моя коллекция', style: 'mainHeader' }
      ],
      styles: {
        mainHeader: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        poster: {
          margin: [0, 10, 0, 10], 
          width: 100,
          height: 150,
        },
      },
    };

    const convertImageToDataURL = async (imageUrl) => {
      return new Promise((resolve, reject) => {
        fetch(imageUrl)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
          .catch(reject);
      });
    };

    for (const serial of allSerials) {
      const base64Image = await convertImageToDataURL(serial.poster);
      console.log(base64Image)
      
      documentDefinition.content.push({
        text: [
          { text: 'Название: ', bold: true }, serial.title, '\n',
          { text: 'Перевод: ', bold: true }, serial.translate, '\n',
          { text: 'Серии: ', bold: true }, serial.series, '\n',
          { text: 'Эпизоды: ', bold: true }, serial.episode, '\n',
          { text: 'Статус: ', bold: true }, serial.status, '\n',
          { text: 'Рейтинг: ', bold: true }, serial.raiting, '\n',
          { text: 'Комментарий: ', bold: true }, serial.comment, '\n',
          {image: `'${base64Image}'`, style: 'poster',}
        ],
        margin: [0, 0, 0, 20],
      });
    }

    pdfMake.createPdf(documentDefinition).download('моя_коллекция.pdf');
  };

  useEffect(() => {
    getAllSerials(setAllSerials, userId);
  }, [setAllSerials, userId]);

  return (
    <div>
      <button onClick={handleShare} className="updateShare buttonUpdateShare">
        ПОДЕЛИТЬСЯ КОЛЛЕКЦИЕЙ
      </button>
    </div>
  );
};

export default ShareCollection;
