import { useState } from "react";
import Modal from "./Modal";
import Filter from "../ButtonComponent/Filter";

const FilterModal = () => {
    const [modalActive, setModalActive] = useState(false)

    return(
        <div>
            <div className="showFilter" onClick={() => setModalActive(true)}></div>
            <Modal active={ modalActive } setActive={ setModalActive }>
                <Filter setActive={ setModalActive }/>
            </Modal>
        </div>
    )
}

export default FilterModal;