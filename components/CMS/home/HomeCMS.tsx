"use client";
import { FormEvent, useState, useEffect, SetStateAction } from "react";
import styles from "./homeCMS.module.css";

import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import tape from "@/public/tape.svg";
import tiles from "@/public/tiles.svg";
import van from "@/public/van.svg";
import resto from "@/public/resto.svg";
import { saveImageToBucket } from "@/utils/CMSHelpers";
//supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loading from "@/app/loading";

// type Props = {
//   data:
//     | {
//         banner_hero: string;
//         bannerBox_1_label: string;
//         bannerBox_1_text: string;
//         bannerBox_2_label: string;
//         bannerBox_2_text: string;
//         bannerBox_3_label: string;
//         bannerBox_3_text: string;
//         bannerBox_4_label: string;
//         bannerBox_4_text: string;
//         btn1: string;
//         btn3: string;
//         created_at: string;
//         id: number;
//         line1_1: string;
//         line1_2: string;
//         line1_3: string;
//         line1_4: string;
//         name: string;
//         phoneNumber: string;
//         profession: string;
//         user_id: string;
//       }[];

// };

const HomeCMS: React.FunctionComponent<any> = ({ data }) => {
  console.log(data);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [form, setForm] = useState(data[0]);
  const [img, setImg] = useState<File>();

  useEffect(() => {
    // if (Array.isArray(data)) {
    //   setForm((prevVals: any) => ({
    //     ...prevVals,
    //     imgName: String(new Date().getTime()),
    //   }));
    // }
    const channel = supabase
      .channel("realtime home")
      .on(
        "postgres_changes",
        {
          event: "*", //insert,update,delete
          schema: "public",
          table: "Home",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase, data, img]);

  // const [form, setForm] = useState<Home>(
  //   data[0] ?? {
  //     name: "Hingyi Norbert",
  //     profession: "Burkoló",
  //     btn1: "Kapcsolat",
  //     phoneNumber: "06 30 716 9769",
  //     btn3: "Tervek és képek kérése",
  //     line1_1: "Hingyi Norbert Pest megyei burkoló 5 év tapasztalattal.",
  //     line1_2: "Magán és céges megrendelőknek",
  //     line1_3: "Bármilyen bonyolultságú és méretű felület burkolása",
  //     line1_4: "Főként Budapesten és körzetében elérhető",
  //     //banner
  //     banner_hero: "Burkolói szolgáltatások",
  //     bannerBox_1_label: "Általános burkolás",
  //     bannerBox_1_text: "Falak, helyiségek és teljes létesítmények",
  //     bannerBox_2_label: "Nagy és kis munkálatok",
  //     bannerBox_2_text: "Kérjen ingyenes árajánlatot mérettől függetlenül",
  //     bannerBox_3_label: "Szerszám és alapanyag biztosítása",
  //     bannerBox_3_text: "Minden amire szüksége van, alacsony áron",
  //     bannerBox_4_label: "Javítás és felújítás",
  //     bannerBox_4_text: "A régi vagy sértült felület javítható",
  //   }
  // );

  // const [form, setForm] = useState<Home>({
  //   data: Array.isArray(data) && data.length > 0 ? data[0] : null,
  // });

  const onChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | FormEvent<HTMLLIElement>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setForm((prevVals: any) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  const submitHandler = async () => {
    try {
      await fetch("/api/cms/home", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      if (img) {
        saveImageToBucket(supabase, form.imgName, img);
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  //add type

  // const resp = await getTest();
  // if (Array.isArray(resp)) {
  //   const { name, email, phone } = resp[0];
  // if (Array.isArray(data)) {

  // }
  const wrapBackground: React.CSSProperties = {
    background: `rgba(0, 0, 0, 0.2) url(${data[0].imgName})`,
  };

  const {
    name,
    profession,
    btn1,
    phoneNumber,
    btn3,
    line1_1,
    line1_2,
    line1_3,
    line1_4,
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

  if (!data) {
    return <Loading />;
  }

  const imgUpdateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      setImg(file);
      setForm((prevVals: any) => ({
        ...prevVals,
        imgName: String(new Date().getTime()),
      }));
    }
  };
  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap} style={wrapBackground}>
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
            id="line1_1"
          >
            {line1_1}
          </h4>

          <ul>
            <li
              contentEditable
              suppressContentEditableWarning
              onBlur={onChangeHandler}
              id="line1_2"
            >
              {line1_2}
            </li>
            <li
              contentEditable
              suppressContentEditableWarning
              onBlur={onChangeHandler}
              id="line1_3"
            >
              {line1_3}
            </li>
            <li
              contentEditable
              suppressContentEditableWarning
              onBlur={onChangeHandler}
              id="line1_4"
            >
              {line1_4}
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

      <div className={styles.submit}>
        <input
          id="img"
          style={{ display: "none" }}
          type="file"
          onChange={imgUpdateHandler}
        />
        <label htmlFor="img">Kép csere</label>
        <button onClick={submitHandler}>
          <strong>MENTÉS</strong>
        </button>
      </div>
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
