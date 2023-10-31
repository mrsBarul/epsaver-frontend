import { useEffect, useState } from "react";
import { deleteSerial, editSerial, getAllSerials } from "../../Fetch/FetchSerial";
import { getUserData } from "../../Redux/authSlice";
import { useSelector } from "react-redux";

const CardEditing = ({ id, setActive, title, Translate, Series, Episode, Status, poster, Raiting, Comment, setAllSerials }) => {

    const userData = useSelector(getUserData);
    const [episode, setEpisode] = useState(Episode);
    const [series, setSeries] = useState(Series);
    const [translate, setTranslate] = useState(Translate);
    const [status, setStatus] = useState(Status);
    const [raiting, setRating] = useState(Raiting);
    const [comment, setComment] = useState(Comment);
    const userId = userData.user.id

    const stop = (e) => {
        e.preventDefault();
    }

    const upDatingSerial = () => {
        editSerial(id, translate, series, episode, 
            status, comment, raiting, userId, setAllSerials)
        setActive(false)
    }

    useEffect(() => {
        getAllSerials(setAllSerials, userId)
    },[setAllSerials, userId])

    return(
        <div className="CardEditingContainer">
            <div className="posterEditingContainer">
                <img className="posterEditing" src={ poster } alt="posterEdit"/>
            </div>
            <form onSubmit={stop} className="editingContainer">
                <div className="titleEditingContainer">
                    <div>
                        <p className="titleEditing">{ title }</p>
                    </div>
                </div>
                <div className="episodeSeriesEditingContainer">
                    <div className="episodeSeriesEditingItem">
                        <label>СЕЗОН</label>
                        <input className="episodeSeriesEditingInput"
                        type="number"
                        value={ episode }
                        onChange={(e) => setEpisode(e.target.value)}/>
                    </div>
                    <div className="episodeSeriesEditingItem">
                        <label>СЕРИЯ</label>
                        <input className="episodeSeriesEditingInput"
                        type="number"
                        value={ series }
                        onChange={(e) => setSeries(e.target.value)}/>
                    </div>
                </div>
                <div className="translateEditing">
                    <label>ПЕРЕВОД</label>
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
                    <label>СТАТУС</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="raitingEditingSelect">
                        <option>СМОТРЮ</option>
                        <option>ЖДУ СЕРИЮ</option>
                        <option>ЖДУ СЕЗОН</option>
                        <option>РЕКОМЕНДАЦИИ</option>
                        <option>ЗАКОНЧЕН</option>
                    </select>
                </div>
                <div className="raitingEditing">
                    <label>РЕЙТИНГ</label>
                    <select value={ raiting } onChange={e => setRating(e.target.value)} className="raitingEditingSelect">
                        <option value="Очень плохо">ОЧЕНЬ ПЛОХО</option>
                        <option value="Плохо">ПЛОХО</option>
                        <option value="Средне">СРЕДНЕ</option>
                        <option value="Хорошо">ХОРОШО</option>
                        <option value="Отлично">ОТЛИЧНО</option>
                    </select>
                </div>
                <div className="commentEditing">
                    <textarea className="commentEditingInput" 
                    type="text"
                    placeholder={ comment }
                    onChange={(e) => setComment(e.target.value)}/>
                </div>
                <div className="buttonsEditingContainer">
                    <div className="deleteEditingButton">
                        <button className="deleteEditing"
                        onClick={() => deleteSerial(id, userId, setAllSerials)}>УДАЛИТЬ</button>
                    </div>
                    <div className="saveEditingButton">
                        <button className="saveEditing"
                        onClick={upDatingSerial}>СОХРАНИТЬ</button>
                    </div>
                </div>
            </form>
        </div>
    )
} 

export default CardEditing;