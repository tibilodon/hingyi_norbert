"use client";
import styles from "./workCard.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = { header: string; list: any[]; img: string };

const WorkCard: React.FunctionComponent<Props> = ({ header, list, img }) => {
  const pathname = usePathname();
  const [edit, setEdit] = useState<boolean>(
    pathname.includes("cms") ? true : false
  );
  const bgImage: React.CSSProperties = {
    backgroundImage: `url(${img})`,
  };
  return (
    <>
      <div style={bgImage} className={styles.wrap}>
        <h2 contentEditable={edit} suppressContentEditableWarning={edit}>
          {header}
        </h2>
        {list &&
          list.map((el: string, i: number) => {
            return (
              <h3
                contentEditable={edit}
                suppressContentEditableWarning={edit}
                key={i}
              >
                {el}
              </h3>
            );
          })}
      </div>
    </>
  );
};

export default WorkCard;
