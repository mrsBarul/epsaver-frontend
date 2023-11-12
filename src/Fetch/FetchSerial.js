import axios from 'axios';


const getAllSerials = (setAllSerials, userId) => {
    axios.get("https://epsaver.onrender.com/getAllSerials",{params: {userId}})
    .then(({data}) => {
    setAllSerials(data)})
}


const saveSerial = ( title, translate, series, episode, 
    status, poster, comment, raiting, newSeason, userId, setAllSerials) => {
    axios.post("https://epsaver.onrender.com/saveSerial", {  title, translate, series, episode, 
    status, poster, comment, raiting, newSeason, userId})
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })
}

const editSerial = (id, translate, series, episode, 
    status, comment, raiting, userId, setAllSerials) => {
    axios.post("https://epsaver.onrender.com/editSerial", {_id: id, translate, series, episode, 
    status, comment, raiting})
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })
}

const deleteSerial = (id, userId, setAllSerials) => {
    axios.post("https://epsaver.onrender.com/deleteSerial", { _id:  id })
    .then((data) => {
        getAllSerials(setAllSerials, userId)
    })

}

export { getAllSerials, saveSerial, editSerial, deleteSerial };