"use client";
import styles from "./imgModal.module.css";
import { useState } from "react";
import Image from "next/image";
import close from "@/public/close.svg";

import forward from "@/public/forward.svg";
import backward from "@/public/backward.svg";

type Props = {
  imgArr: string[];
  descArr: string[];
};

const ImgModal: React.FunctionComponent<Props> = ({ imgArr, descArr }) => {
  const [show, setShow] = useState(false);
  const [bg, setBg] = useState<string>(imgArr[0]);
  const [desc, setDesc] = useState<string>(descArr[0]);

  const currentBg: React.CSSProperties = {
    backgroundImage: `url(${bg})`,
  };

  const forwardHandler = (): void => {
    if (imgArr.indexOf(bg) !== imgArr.length - 1) {
      const value = imgArr.indexOf(bg) + 1;
      setBg(imgArr[value]);
      setDesc(descArr[value]);
    } else {
      setBg(imgArr[0]);
      setDesc(descArr[0]);
    }
  };

  const backwardHandler = (): void => {
    if (imgArr.indexOf(bg) !== 0) {
      const value = imgArr.indexOf(bg) - 1;
      setBg(imgArr[value]);
      setDesc(descArr[value]);
    } else {
      setBg(imgArr[imgArr.length - 1]);
      setDesc(descArr[descArr.length - 1]);
    }
  };
  const selectedHandler = (i: number): void => {
    setBg(imgArr[i]);
    setDesc(descArr[i]);
    setShow(true);
  };

  return (
    <>
      <div className={styles.selectedWrap}>
        {imgArr.map((img: string, i: number) => {
          return (
            <div
              className={styles.selectedImg}
              key={i}
              onClick={() => selectedHandler(i)}
            >
              <Image
                width={200}
                height={250}
                src={img}
                alt={`portfolio image number ${i}`}
              />
              <h4>{descArr[i]}</h4>
            </div>
          );
        })}
      </div>

      {/* 
      <!-- The Modal -->*/}
      <div className={!show ? styles.modal : styles.open}>
        {/*  <!-- Modal content -->*/}
        <div style={currentBg} className={styles.modalContent}>
          <Image
            onClick={() => setShow(false)}
            className={styles.close}
            width={40}
            src={close}
            alt="close icon"
          />
          <div className={styles.imgNav}>
            <Image
              width={40}
              onClick={backwardHandler}
              src={backward}
              alt="arrow pointing to the left"
            />

            <Image
              width={40}
              onClick={forwardHandler}
              // onTouchStart={forwardHandler}
              src={forward}
              alt="arrow pointing to the right"
            />
          </div>
          <span className={styles.details}>
            <h5>{desc}</h5>
            {imgArr.indexOf(bg) + 1} / {imgArr.length}
          </span>
        </div>
      </div>
    </>
  );
};

export default ImgModal;
