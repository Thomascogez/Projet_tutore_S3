import ContentLoader from "react-content-loader"


import React from 'react'

export default function ProfileLoader() {
    return (
        <ContentLoader
            height={50}
            width={50}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <circle cx="288" cy="200" r="200" />
        </ContentLoader> 
    )
}
