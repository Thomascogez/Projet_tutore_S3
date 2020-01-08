import React from "react";
import ContentLoader from "react-content-loader";

const FileTableLoader = () => (
  <tr>
    <td>
      <ContentLoader
        height={10}
        width={50}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="1" rx="4" ry="4" width="20" height="8" />
      </ContentLoader>
    </td>
    <td>
      <ContentLoader
        height={10}
        width={30}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="1" rx="4" ry="4" width="29" height="4" />
      </ContentLoader>
    </td>
    <td>
      <ContentLoader
        height={10}
        width={30}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="1" rx="4" ry="4" width="29" height="4" />
      </ContentLoader>
    </td>
    <td>
      <ContentLoader
        height={10}
        width={50}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="5" y="0" rx="4" ry="4" width="5" height="5" />
      </ContentLoader>
    </td>
    <td></td>
    
  
  </tr>
);



export default FileTableLoader