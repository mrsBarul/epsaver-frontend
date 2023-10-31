import close from '../../close.png'

const Modal = ({ active, setActive, children}) => {

    const enter = (e) => {
        e.stopPropagation();
    }

    return(
        <div className={ active ? "modal active" : "modal"} >
            <div className={ active ? "modalContent active" : "modalContent"} onClick={() => enter}>
                <div className='closeBtn'>
                    <img className='closeImage' onClick={() => setActive(false)} src={ close } alt='close'/>
                </div>
                { children }
            </div>
        </div>
    )
}

export default Modal;