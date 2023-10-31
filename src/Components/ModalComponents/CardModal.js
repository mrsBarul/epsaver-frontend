import { useState } from "react";
import CardEditing from "../CardComponent/CardEditing";
import Modal from "./Modal";

const CardModal = ({ title, translate, series, episode, status, poster, raiting, comment, setAllSerials, id }) => {
    const [modalActive, setModalActive] = useState(false)

    return(
        <div>
            <div className="show" onClick={() => setModalActive(true)}></div>
            <Modal active={ modalActive } setActive={ setModalActive } >
                <CardEditing setActive={ setModalActive }
                title={ title }
                Translate={ translate }
                Series={ series }
                Episode={ episode }
                Status={ status }
                poster={ poster }
                Raiting={ raiting }
                Comment={ comment }
                setAllSerials={ setAllSerials }
                id={id}/>
            </Modal>
        </div>
    )
}

export default CardModal;