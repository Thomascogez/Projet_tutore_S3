import React from "react";
import style from "./loader.module.css";
import Loader from "react-loader-spinner";
export default function PageLoader({ message }) {
  return (
    <>
      <div className={style.LoaderContainer}></div>
      <div className={style.LoaderContent}>
        {message && <h3>{message}</h3>}
        <Loader
          type="TailSpin"
          color="rgba(11, 191, 140, 0.93)"
          height={80}
          width={80}
        />
      </div>
    </>
  );
}
