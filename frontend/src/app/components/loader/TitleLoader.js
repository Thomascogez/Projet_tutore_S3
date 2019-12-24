import React from "react";
import ContentLoader from "react-content-loader";

const TitleLoader = () => (
  <ContentLoader
    height={20}
    width={341}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="4" ry="4" width="117" height="15" />
  </ContentLoader>
);

export default TitleLoader;
