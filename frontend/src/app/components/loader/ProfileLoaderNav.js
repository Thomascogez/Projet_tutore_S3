import ContentLoader from "react-content-loader";

import React from "react";

export default function ProfileLoader() {
  return (
    <ContentLoader 
    height={40}
    width={100}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <circle cx="50" cy="20" r="20" />
  </ContentLoader>
  );
}
