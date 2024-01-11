"use client";
import styles from "./workCard.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  header: string;
  list: any[];
  img: string;
};

const WorkCard: React.FunctionComponent<Props> = ({ header, list, img }) => {
  const pathname = usePathname();

  const bgImage: React.CSSProperties = {
    backgroundImage: `url(${img})`,
  };

  return (
    <>
      <div style={bgImage} className={styles.wrap}>
        <h2>{header}</h2>
        {list &&
          list.map((el: string, i: number) => {
            return <h3 key={i}>{el}</h3>;
          })}
      </div>
    </>
  );
};

export default WorkCard;
