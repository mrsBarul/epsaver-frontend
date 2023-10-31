import { useState, useEffect, useCallback} from "react";
import SearchAdd from "../SearchComponent/SearchAdd";
import Modal from "./Modal";


const SearchModal = ({poster,title,setAllSerials,idSerial,setActiveInput,setNewSearch}) => {

    const KEY = "X2VPFX0-XMQ4RN0-HZQMT6R-HEZ2Q1H";

    const [modalActive, setModalActive] = useState(false);
    const [newSeason, setNewSeason] = useState();
    
    const getNewSeason = useCallback(async() => {
      if(idSerial) {
        const result = await fetch(`https://api.kinopoisk.dev/v1/season?sortField=number&sortField=episodes.number&sortField=episodes.date&sortType=-1&sortType=1&page=1&limit=10&movieId=${idSerial}`, {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": KEY,
          },
        })
      const response = await result.json();
      console.log(response)
      const dataResult = response.docs[0]?.episodes[0]?.date;
      if (dataResult === null) {
        setNewSeason('null');
      } else if (!dataResult) {
        setNewSeason('null');
      } else {
        setNewSeason(dataResult);
      }
      }
    }, [idSerial]);

      useEffect(() => {
        getNewSeason();
      }, [getNewSeason]);

      const show = () => {
        getNewSeason();
        setModalActive(true)
      }

    return (
        <div className="showSearchContainer">
            <div className="showSearch" onClick={show}></div>
            <Modal active={modalActive} setActive={setModalActive}>
                <SearchAdd
                newSeason={newSeason}
                setActive={setModalActive}
                poster={poster}
                title={title}
                setAllSerials={setAllSerials}
                setActiveInput={setActiveInput}
                setNewSearch={setNewSearch}
                />
            </Modal>
        </div>
    );
    };

export default SearchModal;