import React from 'react'
import {navigate} from 'hookrouter'
import {Button} from "shards-react"
import img from '../../assets/images/error_401.jpg'

export default () => {

    return (
        <React.Fragment>
            <img src={img} style={{width: "40%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
            <Button style={{width: "40%", display: "block", marginLeft: "auto", marginRight: "auto"}}
                    onClick={() => navigate('/')}>Retour a l'accueil</Button>
        </React.Fragment>
    );
}