import React from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Collapse as ShardCollaps } from "shards-react";
import style from "./collapse.module.css";
export default function Collapse({ open, title, toggler, children }) {
  return (
    <>
      <div onClick={() => toggler(!open)} className={style.ViewCollapse}>
        {open ? <FaAngleDown /> : <FaAngleRight />} {title}
      </div>
      <ShardCollaps open={open}>{children}</ShardCollaps>
    </>
  );
}
