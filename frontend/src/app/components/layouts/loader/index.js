import React from 'react'
import style from './loader.module.css'
import Loader from 'react-loader-spinner'
export default function PageLoader() {
    return (
        <div className= {style.Loader}>
          <Loader type="TailSpin" color="rgba(11, 191, 140, 0.93)" height={80} width={80} />


    
        </div>
    )
}
