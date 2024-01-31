import {  useState, useEffect } from "react";
import { getAllSerials, saveSerial } from "../../Fetch/FetchSerial";
import { getUserData } from "../../Redux/authSlice";
import { useSelector } from "react-redux";




const SearchAdd = ({ setActive, poster, title, newSeason, idSerial, setAllSerials, setActiveInput, setNewSearch  }) => {

    const userData = useSelector(getUserData);
    const [episode, setEpisode] = useState(1);
    const [series, setSeries] = useState(1);
    const [translate, setTranslate] = useState('HDrezka Studio');
    const [status, setStatus] = useState('СМОТРЮ');
    const [raiting, setRating] = useState('Хорошо');
    const [comment, setComment] = useState('Напиши здесь свои мысли...');
    const userId = userData.user.id;



    const saveNewSerials = () => {
        saveSerial(title, translate, series, episode, 
            status, poster, comment, raiting, newSeason, idSerial, userId, setAllSerials)
        setActive(false)
        setActiveInput(false)
        setNewSearch('')
    }

    useEffect(() => {
        getAllSerials(setAllSerials, userId)
    }, [setAllSerials, userId])



    return(
        <div className="CardEditingContainer">
            <div className="posterEditingContainer">
                <img className="posterEditing" src={ poster } alt="posterEdit"/>
            </div>
            <form onSubmit={e => e.preventDefault()} className="editingContainer">
                <div>
                    <p className="titleAdd">{ title }</p>
                </div>
                <div className="episodeSeriesEditingContainer">
                    <div className="episodeSeriesEditingItem">
                        <label>Сезон</label>
                        <input className="episodeSeriesEditingInput"
                        type="number"
                        value={ episode }
                        onChange={(e) => setEpisode(e.target.value)}/>
                    </div>
                    <div className="episodeSeriesEditingItem">
                        <label>Серия</label>
                        <input className="episodeSeriesEditingInput"
                        type="number"
                        value={ series }
                        onChange={(e) => setSeries(e.target.value)}/>
                    </div>
                </div>
                <div className="translateEditing">
                    <label>Перевод</label>
                    <select value={translate} onChange={e => setTranslate(e.target.value)} className="translateEditingSelect">
                        <option value="HDrezka Studio">HDrezka Studio</option>
                        <option value="LostFilm">LostFilm</option>
                        <option value="Original(EN)">Original(EN)</option>
                        <option value="Original(RU)">Original(RU)</option>
                        <option value="TVShows">TVShows</option>
                        <option value="NewStudio">NewStudio</option>
                        <option value="BaibaKo.TV">BaibaKo.TV</option>
                        <option value="Amediateka">Amediateka</option>
                        <option value="Coldfilm">Coldfilm</option>
                        <option value="Кубик в кубе">Кубик в кубе</option>
                        <option value="Невафильм">Невафильм</option>
                        <option value="AlexFilm">AlexFilm</option>
                        <option value="Пифагор">Пифагор</option>
                        <option value="IdeaFilm">IdeaFilm</option>
                        <option value="Octopus">Octopus</option>
                    </select>
                </div>
                <div className="statusEditing">
                    <label>Статус</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="raitingEditingSelect">
                        <option value="СМОТРЮ">СМОТРЮ</option>
                        <option value="ЖДУ СЕРИЮ">ЖДУ СЕРИЮ</option>
                        <option value="ЖДУ СЕЗОН">ЖДУ СЕЗОН</option>
                        <option value="РЕКОМЕНДАЦИИ">РЕКОМЕНДАЦИИ</option>
                        <option value="ЗАКОНЧЕН">ЗАКОНЧЕН</option>
                    </select>
                </div>
                <div className="raitingEditing">
                    <label>Рейтинг</label>
                    <select value={ raiting } onChange={e => setRating(e.target.value)} className="raitingEditingSelect">
                        <option value="Очень плохо">Очень плохо</option>
                        <option value="Плохо">Плохо</option>
                        <option value="Средне">Средне</option>
                        <option value="Хорошо">Хорошо</option>
                        <option value="Отлично">Отлично</option>
                    </select>
                </div>
                <div className="commentEditing">
                    <textarea className="commentEditingInput"
                    type="text"
                    value={ comment }
                    onChange={(e) => setComment(e.target.value)}/>
                </div>
                <div className="buttonsEditingContainer">
                    <div className="deleteEditingButton">
                        <button className="deleteEditing" onClick={() => setActive(false)}>Отмена</button>
                    </div>
                    <div className="saveEditingButton">
                        <button className="saveEditing"
                        onClick={saveNewSerials}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchAdd;