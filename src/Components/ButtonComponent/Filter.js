import Buttons from './Buttons';

const Filter = ({ setActive }) => {
    return(
        <div className="buttonContainer" >
            {["СМОТРЮ", "ЖДУ СЕРИЮ", "ЖДУ СЕЗОН", "РЕКОМЕНДАЦИИ", "ЗАКОНЧЕН", "ВСЕ"].map
            ((status, index) => <Buttons status={ status } key={ index }/>)}
        </div>
    )
}

export default Filter;