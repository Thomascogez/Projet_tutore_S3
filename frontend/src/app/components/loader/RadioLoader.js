import React from "react";
import ContentLoader from "react-content-loader";
import { FormRadio } from "shards-react";

export default function RadioLoader() {
  return (
    <FormRadio>
      <ContentLoader
        height={5}
        width={200}
        speed={2}
        primaryColor="#d3d3d3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="0" rx="4" ry="4" width={15} height="4" />
      </ContentLoader>
    </FormRadio>
  );
}
