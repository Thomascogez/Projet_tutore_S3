import React from "react";
import ContentLoader from "react-content-loader";
export default function TextLoader({width,x}) {
    
  return (
    <ContentLoader
      height={30}
      width={200}
      speed={2}
      primaryColor="#d3d3d3"
      secondaryColor="#ecebeb"
    >
         <rect x={x} y="15" rx="4" ry="4" width={width} height="6" /> 

    </ContentLoader>
  );
}
