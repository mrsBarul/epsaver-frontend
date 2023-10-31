import { useState } from "react";
import RegistrationAuth from '../Auth/RegistrationAuth';
import Modal from "./Modal";


const RegistrationModal = () => {
    const [modalActive, setModalActive] = useState(false)

    return(
        <div>
            <div className="show" onClick={() => setModalActive(true)}></div>
            <Modal active={ modalActive } setActive={ setModalActive }>
                <RegistrationAuth setActive={ setModalActive }/>
            </Modal>
        </div>
    )
}

export default RegistrationModal;