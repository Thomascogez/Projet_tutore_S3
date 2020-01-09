import React, { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Collapse as ShardCollaps } from "shards-react";
import style from "./collapse.module.css";
export default function Collapse({ title, children }) {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(!open)} className={style.ViewCollapse}>
        {open ? <FaAngleDown /> : <FaAngleRight />} {title}
      </div>
      <ShardCollaps open={open}>{children}</ShardCollaps>
    </>
  );
}