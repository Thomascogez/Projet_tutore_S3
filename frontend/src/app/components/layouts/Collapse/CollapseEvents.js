import React, { useState } from "react";
import { Collapse as ShardCollaps } from "shards-react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import style from "./collapse.module.css";

export default function Collapse({ title, size, children }) {
  const [open, setOpen] = useState(false);
  console.log(size);

  return (
    <>
      {size > 1 ? (
        <>
          <div onClick={() => setOpen(!open)} className={style.ViewCollapse}>
            {open ? <FaAngleDown /> : <FaAngleRight />} {title}
          </div>
          <ShardCollaps open={open}>{children}</ShardCollaps>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
