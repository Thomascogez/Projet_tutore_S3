import axios from 'axios';

/**
 * 
 * @param {*} sessionID 
 * @param {*} eventID 
 * @param {*} file 
 */
const APIpostFile= ( sessionID, eventID, file ) => {

    return axios.post(`https://schoolshare.tools/api/sessions/${sessionID}/events/${eventID}/attachments`,
    {source : file }
    ,{
        
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }

    }

        

    )
}


export { APIpostFile }