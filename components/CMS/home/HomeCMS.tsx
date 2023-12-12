"use client";
import { FormEvent, useState } from "react";
import styles from "./homeCMS.module.css";

import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import Banner from "@/components/banner/Banner";
import Image from "next/image";
import tape from "@/public/tape.svg";
import tiles from "@/public/tiles.svg";
import van from "@/public/van.svg";
import resto from "@/public/resto.svg";

type Props = {
  data:
    | {
        banner_hero: string | null;
        bannerBox_1_label: string | null;
        bannerBox_1_text: string | null;
        bannerBox_2_label: string | null;
        bannerBox_2_text: string | null;
        bannerBox_3_label: string | null;
        bannerBox_3_text: string | null;
        bannerBox_4_label: string | null;
        bannerBox_4_text: string | null;
        btn1: string | null;
        btn3: string | null;
        created_at: string;
        id: number;
        line1_1: string | null;
        line1_2: string | null;
        line1_3: string | null;
        line1_4: string | null;
        name: string | null;
        phoneNumber: string | null;
        profession: string | null;
        user_id: string | null;
      }[]
    | null;
};

const HomeCMS: React.FunctionComponent<Props> = ({ data }) => {
  const [form, setForm] = useState({
    name: "Hingyi Norbert",
    profession: "Burkoló",
    btn1: "Kapcsolat",
    phoneNumber: "06 30 716 9769",
    btn3: "Tervek és képek kérése",
    line_1: "Hingyi Norbert Pest megyei burkoló 5 év tapasztalattal.",
    line_2: "Magán és céges megrendelőknek",
    line_3: "Bármilyen bonyolultságú és méretű felület burkolása",
    line_4: "Főként Budapesten és körzetében elérhető",
    //banner
    banner_hero: "Burkolói szolgáltatások",
    bannerBox_1_label: "Általános burkolás",
    bannerBox_1_text: "Falak, helyiségek és teljes létesítmények",
    bannerBox_2_label: "Nagy és kis munkálatok",
    bannerBox_2_text: "Kérjen ingyenes árajánlatot mérettől függetlenül",
    bannerBox_3_label: "Szerszám és alapanyag biztosítása",
    bannerBox_3_text: "Minden amire szüksége van, alacsony áron",
    bannerBox_4_label: "Javítás és felújítás",
    bannerBox_4_text: "A régi vagy sértült felület javítható",
  });

  const onChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | FormEvent<HTMLLIElement>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setForm((prevVals) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  const logme = () => {
    console.log(form);
  };

  //add type

  // const resp = await getTest();
  // if (Array.isArray(resp)) {
  //   const { name, email, phone } = resp[0];
  const {
    name,
    profession,
    btn1,
    phoneNumber,
    btn3,
    line_1,
    line_2,
    line_3,
    line_4,
    //banner
    banner_hero,
    bannerBox_1_label,
    bannerBox_1_text,
    bannerBox_2_label,
    bannerBox_2_text,
    bannerBox_3_label,
    bannerBox_3_text,
    bannerBox_4_label,
    bannerBox_4_text,
  } = form;
  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap}>
          {/* <h2>{name}</h2> */}
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="name"
          >
            {name}
          </h2>
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="profession"
          >
            {profession}
          </h1>
          <div className={styles.btns}>
            <div className={`${styles.buttonHome} ${styles.outline}`}>
              <Image
                className={styles.icon}
                width={20}
                height={20}
                src={contact}
                alt={`contact icon`}
              />
              <h4
                contentEditable
                suppressContentEditableWarning
                onBlur={onChangeHandler}
                id="btn1"
              >
                {btn1}
              </h4>
            </div>

            <div className={styles.buttonHome}>
              <Image
                className={styles.icon}
                width={20}
                height={20}
                src={black_phone}
                alt={`phone icon`}
              />
              <h4
                contentEditable
                suppressContentEditableWarning
                onBlur={onChangeHandler}
                id="phoneNumber"
              >
                {phoneNumber}
              </h4>
            </div>

            {/*TODO:links to email app, highly inconvenient - nav to contact form and add template text*/}
            <div className={styles.buttonHome}>
              <Image
                className={styles.icon}
                width={20}
                height={20}
                src={mail}
                alt={`mail icon`}
              />
              <h4
                contentEditable
                suppressContentEditableWarning
                onBlur={onChangeHandler}
                id="btn3"
              >
                {btn3}
              </h4>
            </div>
          </div>

          <h4
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="line_1"
          >
            {line_1}
          </h4>

          <ul>
            <li
              contentEditable
              suppressContentEditableWarning
              onBlur={onChangeHandler}
              id="line_2"
            >
              {line_2}
            </li>
            <li
              contentEditable
              suppressContentEditableWarning
              onBlur={onChangeHandler}
              id="line_3"
            >
              {line_3}
            </li>
            <li
              contentEditable
              suppressContentEditableWarning
              onBlur={onChangeHandler}
              id="line_4"
            >
              {line_4}
            </li>
          </ul>
        </div>

        <span className={styles.banner}>
          {/*TODO: <Banner /> */}
          <div className={styles.bannerWrap}>
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={onChangeHandler}
              id="banner_hero"
            >
              {banner_hero}
            </h2>
            {/*BannerBox*/}
            <div className={styles.bannerBoxWrap}>
              <Image width={80} src={tiles} alt={"tiles icon "} />
              <div className={styles.texts}>
                <h3
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_1_label"
                >
                  {bannerBox_1_label}
                </h3>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_1_text"
                >
                  {bannerBox_1_text}
                </p>
              </div>
            </div>

            <div className={styles.bannerBoxWrap}>
              <Image width={80} src={tape} alt={"tape icon "} />
              <div className={styles.texts}>
                <h3
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_2_label"
                >
                  {bannerBox_2_label}
                </h3>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_2_text"
                >
                  {bannerBox_2_text}
                </p>
              </div>
            </div>

            <div className={styles.bannerBoxWrap}>
              <Image width={80} src={van} alt={"van icon "} />
              <div className={styles.texts}>
                <h3
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_3_label"
                >
                  {bannerBox_3_label}
                </h3>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_3_text"
                >
                  {bannerBox_3_text}
                </p>
              </div>
            </div>

            <div className={styles.bannerBoxWrap}>
              <Image width={80} src={resto} alt={"restoration icon "} />
              <div className={styles.texts}>
                <h3
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_4_label"
                >
                  {bannerBox_4_label}
                </h3>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={onChangeHandler}
                  id="bannerBox_4_text"
                >
                  {bannerBox_4_text}
                </p>
              </div>
            </div>
          </div>
        </span>
      </div>
      <button className={styles.submit} onClick={logme}>
        <strong>MENTÉS</strong>
      </button>
    </>
  );
  // } else {
  //   // Handle error response here
  //   const msg = "error occured";
  //   console.log("Error response-----------------------------:", resp);
  //   return <Loading />;
  // }
};
export default HomeCMS;
