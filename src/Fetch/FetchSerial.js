import axios from 'axios';


const getAllSerials = (setAllSerials, userId) => {
    axios.get("http://localhost:8000/getAllSerials",{params: {userId}})
    .then(({data}) => {
    setAllSerials(data)})
}


const saveSerial = ( title, translate, series, episode, 
    status, poster, comment, raiting, newSeason, userId, setAllSerials) => {
    axios.post("http://localhost:8000/saveSerial", {  title, translate, series, episode, 
    status, poster, comment, raiting, newSeason, userId})
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })
}

const editSerial = (id, translate, series, episode, 
    status, comment, raiting, userId, setAllSerials) => {
    axios.post("http://localhost:8000/editSerial", {_id: id, translate, series, episode, 
    status, comment, raiting})
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })
}

const deleteSerial = (id, userId, setAllSerials) => {
    axios.post("http://localhost:8000/deleteSerial", { _id:  id })
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })

}

export { getAllSerials, saveSerial, editSerial, deleteSerial };