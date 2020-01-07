import axios from 'axios';

/**
 * 
 * @param {*} sessionID 
 * @param {*} eventID 
 * @param {*} file 
 */
const APIpostFile= ( sessionID, eventID, file ) => {

    let formData = new FormData();
    formData.append('source',file)

    return axios.post(`https://schoolshare.tools/api/sessions/${sessionID}/events/${eventID}/attachments`,formData 
    ,{
        
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }

    }

        

    )
}


export { APIpostFile }