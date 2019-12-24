import React from "react";
import ContentLoader from "react-content-loader";

const TableLoader = () => (
  <tr>
    <td>
      <ContentLoader
        height={10}
        width={30}
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
        width={30}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="1" rx="4" ry="4" width="29" height="8" />
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
        <rect x="0" y="1" rx="4" ry="4" width="29" height="6" />
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
        <circle cx="10" cy="3" r="3" />
      </ContentLoader>
    </td>
  
  </tr>
);



export default TableLoader