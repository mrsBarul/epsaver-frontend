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

      const logo = 'data:image/png;base64,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'
    
      const documentDefinition = {
        page: {
          width: 595.276,  
          height: 841.890, 
        },
        background: [
          {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 595.276, 
                h: 841.890, 
                r: 0, 
                color: '#7F86A2', 
              },
            ],
          },
        ],
        content: [
          {
            columns: [
              { text: 'МОЯ КОЛЛЕКЦИЯ', style: 'mainHeader' },
              { image: logo, style: 'logo' },
            ],
          },
        ],
        styles: {
          mainHeader: {
            fontSize: 24,
            bold: true,
            color: '#080B16',
            margin: [0, 10, 0, 10],
          }, logo: {
            with: 100,
            height: 50,
            alignment: 'right',
            margin: [-20, 0, 0, 0],
            radius: 10,
          },
          boldText: {
            fontSize: 16,
            bold: true,
          }, normalText: {
            fontSize: 12,
          }
      },
    };

    const convertImageToDataURL = async (imageUrl, targetWidth, targetHeight) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          const dataURL = canvas.toDataURL('image/jpeg');
          resolve(dataURL);
        };
        img.onerror = reject;
      });
    };

    for (const serial of allSerials) {
      const base64Image = await convertImageToDataURL(serial.poster, 200, 300);
      
      documentDefinition.content.push({
        stack: [
          {
            columns: [
              { image: base64Image, width: 150, height: 200, margin: [0, 10, 10, 0] },
              {
                stack: [
                  {
                    text: [
                      { text: 'Название: ', bold: true, style: 'boldText' },
                      { text: serial.title, style: 'normalText', margin: [0, 0, 0, 10] },
                    ],
                  },
                  {
                    text: [
                      { text: 'Перевод: ', bold: true, style: 'boldText' },
                      { text: serial.translate, style: 'normalText', margin: [0, 0, 0, 10] },
                    ],
                  },
                  {
                    text: [
                      { text: 'Серии: ', bold: true, style: 'boldText' },
                      { text: serial.series, style: 'normalText', margin: [0, 0, 0, 10] },
                    ],
                  },
                  {
                    text: [
                      { text: 'Эпизоды: ', bold: true, style: 'boldText' },
                      { text: serial.episode, style: 'normalText', margin: [0, 0, 0, 10] },
                    ],
                  },
                  {
                    text: [
                      { text: 'Статус: ', bold: true, style: 'boldText' },
                      { text: serial.status, style: 'normalText', margin: [0, 0, 0, 10] },
                    ],
                  },
                  {
                    text: [
                      { text: 'Рейтинг: ', bold: true, style: 'boldText' },
                      { text: serial.raiting, style: 'normalText', margin: [0, 0, 0, 10] },
                    ],
                  },
                  {
                    text: [
                      { text: 'Комментарий: ', bold: true, style: 'boldText' },
                      { text: serial.comment, style: 'normalText', margin: [0, 0, 0, 10] },
                    ],
                  },
                ],
                margin: [30, 30, 0, ],
              },
            ],
            alignment: 'left',
          },
          { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 565 - 40, y2: 5, lineWidth: 1 }] },
        ],
        margin: [0, 0, 0, 30],
      }
      );
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
