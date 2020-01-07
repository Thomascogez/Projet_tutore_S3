import React from "react";
import ContentLoader from "react-content-loader";
import style from "../layouts/Collapse/collapse.module.css";


const CollapseLoader = () => (
    <>
        <div className={style.ViewCollapse}>
            <div>
                <ContentLoader 
                    height={10}
                    width={400}
                    speed={2}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"><rect x="0" y="1" rx="4" ry="4" width="200" height="8" />
                </ContentLoader>
                </div>
        </div>
    </>




);



export default CollapseLoader;