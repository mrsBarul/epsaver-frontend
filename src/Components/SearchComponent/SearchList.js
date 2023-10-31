import SearchModal from "../ModalComponents/SearchModal";

const SearchList = ({ poster, title, idSerial, setAllSerials, setActiveInput,setNewSearch, releaseYears}) => {

    return(
        <div className="searchListItem">
            <SearchModal
            poster={poster}
            title={title}
            idSerial={idSerial}
            setAllSerials={ setAllSerials }
            setActiveInput={setActiveInput}
            setNewSearch={setNewSearch}
            />

            <div  className='posterImageContainer'>
                <img src={poster} className='posterImage' alt="poster"/>
            </div>
            <div>
                <div>
                    <p className='titleOfSerial'>"{ title }"</p>
                </div>
                <div>
                    {releaseYears.map((year, idSerial) => (
                        <p key={ idSerial } className='yearOfSerial'>{year.start} - {year.end === null ? ' . . . ' : year.end}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchList;