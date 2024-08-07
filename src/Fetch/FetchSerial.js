import axios from 'axios';

const getAllSerials = (setAllSerials, userId) => {
    axios.get("https://epsaver-p913.onrender.com/getAllSerials",{params: {userId}})
    .then(({data}) => {
    setAllSerials(data)})
}

const saveSerial = ( title, translate, series, episode, 
    status, poster, comment, raiting, newSeason, idSerial, userId, setAllSerials) => {
    axios.post("https://epsaver-p913.onrender.com/saveSerial", {  title, translate, series, episode, 
    status, poster, comment, raiting, newSeason, idSerial, userId})
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })
}

const editSerial = (id, translate, series, episode, 
    status, comment, raiting, userId, setAllSerials) => {
    axios.post("https://epsaver-p913.onrender.com/editSerial", {_id: id, translate, series, episode, 
    status, comment, raiting})
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })
}

const deleteSerial = (id, userId, setAllSerials) => {
    axios.post("https://epsaver-p913.onrender.com/deleteSerial", { _id:  id })
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })
}

export { getAllSerials, saveSerial, editSerial, deleteSerial };