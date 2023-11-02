import { useState } from "react";
import icon from "../../Image/iconSearch.png"
import { useDispatch } from "react-redux";
import { searchCard } from "../../Redux/searchSlice";

const SearchCard = () => {

    const [word, setWord] = useState("")
    const dispatch = useDispatch()


    const handleChange = (event) => {
        setWord((event.target.value.toLowerCase()))
        dispatch(searchCard(event.target.value.toLowerCase()))
    }

    return(
        <form className='search' onSubmit={e => e.preventDefault()}  >
            <input 
            type='search'
            value={ word }
            onChange={handleChange}
            className='searchInput'  placeholder='ПОИСК...'/>
            <span>
                <img src={ icon } className='iconSearch'  alt="search"/>
            </span>
        </form>
    )
} 

export default SearchCard;