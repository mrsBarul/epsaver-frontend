import { useState, useCallback, useEffect } from "react";
import newEpisode from "../../Image/newEpisode.png"
import CardModal from "../ModalComponents/CardModal";
import ReactCurvedText from 'react-curved-text';
import  dayjs  from "dayjs";
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration);


const Card = ({title, translate, series, episode, status, poster, raiting, comment, newSeason, setAllSerials, id }) => {

    const [timeLeft, setTimeLeft] = useState({ year: 0, day: 0, hour: 0, minute: 0 });
    const [rx, setRx] = useState(30);
    const [ry, setRy] = useState(30);
    const [cx, setCx] = useState(45);
    const [cy, setCy] = useState(45);
    const [textStyles, setTextStyles] = useState({ fontSize: 13, letterSpacing: 0.2 });


    const updateEllipseRadius = () => {
        if (window.innerWidth <= 350){
            setRx(30); 
            setRy(30);
            setCx(45);
            setCy(45);
            setTextStyles({ fontSize: 13, letterSpacing: 0.2 });
        } else if (window.innerWidth <= 768) { 
            setRx(25);
            setRy(25);
            setCx(35);
            setCy(35);
            setTextStyles({ fontSize: 11, letterSpacing: 0.1 });
        }
        else {
            setRx(30); 
            setRy(30);
            setCx(45);
            setCy(45);
            setTextStyles({ fontSize: 13, letterSpacing: 0.2 });
        }
    };

    useEffect(() => {
        updateEllipseRadius();
        window.addEventListener('resize', updateEllipseRadius);

        return () => {
            window.removeEventListener('resize', updateEllipseRadius);
        };
    }, []);
    
    const counter = useCallback(() => {
        if(newSeason === 'null' ) {
            setTimeLeft({ year: 0, day: 0, hour: 0, minute: 0 });
        } else {
            const now = dayjs(new Date());
            const season = dayjs(newSeason);
            const diff = season.diff(now);
            const duration = dayjs.duration(diff);
            if(duration.$ms > 0) {
                setTimeLeft({year: duration.years(), day: duration.days(), hour: duration.hours(), minute: duration.minutes()})
                
            } else {
                setTimeLeft({ year: 0, day: 0, hour: 0, minute: 0 })
            }
        }

    }, [newSeason]);

    useEffect(() => {
        counter();
        const timer = setInterval(() => {
            counter();
        },60000)
        
        return() => {
            clearInterval(timer)
        }
    }, [counter]);


    return(
        <div className="cardContainer">
                <CardModal
                title={ title }
                translate={ translate }
                series={ series }
                episode={ episode }
                status={ status }
                poster={ poster }
                raiting={ raiting }
                comment={ comment }
                setAllSerials={ setAllSerials }
                id={id}
                />
            <div className="poster"><img src={poster} alt="poster"/></div>
            <div className="cardContent">
                <div className="episodeSeries">
                    <div className="episodeContainer">
                        <ReactCurvedText
                            width={90}
                            height={90}
                            cx={cx}
                            cy={cy}
                            rx={rx}
                            ry={ry}
                            startOffset={0}
                            reversed={true}
                            text="СЕЗОН ★ СЕЗОН ★ СЕЗОН ★"
                            textProps={{ style: textStyles  }}
                            textPathProps={{"fill": "#e7b45e"}}
                        />
                        <div className="episode">
                            <p>{ episode }</p>
                        </div>
                        
                    </div>
                    <div className="seriesContainer">
                        <ReactCurvedText
                            width={90}
                            height={90}
                            cx={cx}
                            cy={cy}
                            rx={rx}
                            ry={ry}
                            startOffset={0}
                            reversed={true}
                            text="СЕРИЯ ☆ СЕРИЯ ☆ СЕРИЯ ☆"
                            textProps={{ style: textStyles  }}
                            textPathProps={{"fill": "#e7b45e"}}
                        />
                        <div className="series">
                            <p>{ series }</p>
                        </div>
                        
                    </div>
                </div>
                <div className="serialInfo">
                    <div className="newEpisode">
                        <img className="ticket" src={ newEpisode } alt="newEpisode"/>
                    </div>
                    <div className="title">
                        <p className={title.length >=19 ? "nameOfSerialLong": "nameOfSerial"}> { title } </p>
                        <p className="translate">{ translate }</p>
                    </div>
                    <div className="containerNewEpisode">
                        <div className="itemNewEpisode">
                            <p className="year">лет</p>
                            <p className="numberOfYear">{timeLeft.year}</p>
                        </div>
                        <hr className="lineCard"/>
                        <div className="itemNewEpisode">
                            <p className="day">дней</p>
                            <p className="numberOfDay">{timeLeft.day}</p>
                        </div>
                        <hr className="lineCard"/>
                        <div className="itemNewEpisode">
                            <p className="hour">часов</p>
                            <p className="numberOfHour">{timeLeft.hour}</p>
                        </div>
                        <hr className="lineCard"/>
                        <div className="itemNewEpisode">
                            <p className="minute">минут</p>
                            <p className="numberOfMinute">{timeLeft.minute}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;