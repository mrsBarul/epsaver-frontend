import { useCallback, useEffect, useState } from "react";
import icon from '../../iconAdd.png'
import SearchList from "./SearchList";
import { useDebounce } from 'use-debounce';

const Search = ({ setAllSerials }) => {

    const KEY = 'X2VPFX0-XMQ4RN0-HZQMT6R-HEZ2Q1H';

    const [newSearch, setNewSearch] = useState('');
    const [mySearch, setMySearch] = useState([]);
    const [activeInput, setActiveInput] = useState(false)
    


    
    const [debouncedSearch] = useDebounce(newSearch, 500);

    const getNewSearch = useCallback(async () => {
        const response = await fetch(
        `https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&name=${debouncedSearch}&isSeries=true`,
        {
            headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': KEY,
            },
        }
        );
        const data = await response.json();
        console.log(data)
        setMySearch(data.docs);
    }, [debouncedSearch]);

    useEffect(() => {
        if (debouncedSearch) {
        getNewSearch();
        }
    }, [debouncedSearch, getNewSearch]);

    const inputValue = (e) => {
        if(e.target.value === '') {
            setActiveInput(false)
        } return setNewSearch(e.target.value)
    }

    const enterSearch = (e) => {
        e.preventDefault();
        setActiveInput(true)
    }

    return(
        <div className="searchNewSerialContainer">
            <form className="formSearch" onSubmit={ enterSearch }>
                <input className="searchNewSerialInput" 
                type="search"
                onChange={ inputValue } 
                value={ newSearch }
                placeholder="ДОБАВИТЬ СЕРИАЛ..."/>
                <span className="add" onClick={enterSearch}><img src={ icon } className='iconSearch'  alt="search"/></span>
            </form>
            <div className={ activeInput ? "searchListContainer" : "displayNone"}>
                {mySearch.map(item => (
                item.poster && item.poster.url ? (
                    <SearchList
                    key={item.id}
                    poster={item.poster.url}
                    title={item.name}
                    releaseYears={item.releaseYears}
                    idSerial={item.id}
                    setActiveInput={setActiveInput}
                    setAllSerials={setAllSerials}
                    setNewSearch={setNewSearch}
                    />
                ) : null
                ))}
            </div>
        </div>

    )
}

export default Search;


