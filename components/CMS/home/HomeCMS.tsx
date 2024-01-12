"use client";
import { FormEvent, useState, useEffect, SetStateAction } from "react";
import styles from "./homeCMS.module.css";

import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import Image from "next/image";
import tape from "@/public/tape.svg";
import tiles from "@/public/tiles.svg";
import van from "@/public/van.svg";
import resto from "@/public/resto.svg";
import { swapImage } from "@/utils/CMSHelpers";
//supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loading from "@/app/loading";

const HomeCMS: React.FunctionComponent<any> = ({ data, user }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  if (!user) {
    router.push("/unauthenticated");
  }

  const [prev, setPrev] = useState<React.CSSProperties>({
    background: `rgba(0, 0, 0, 0.2) url(${data[0].imgName})`,
    backgroundSize: "cover",
    backgroundBlendMode: "darken",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState(data[0]);
  const [img, setImg] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  useEffect(() => {
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
  }, [router, supabase]);

  const onChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | React.FormEvent<HTMLLIElement>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setForm((prevVals: any) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  const imgUpdateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];

      setImg(file);
      setPrev({
        background: `rgba(0, 0, 0, 0.2) url(${
          file ? URL.createObjectURL(file) : data[0].imgName
        })`,
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
      });
      setImageName(String(new Date().getTime()));
    }
  };

  const handleColorChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    setForm((prevVals: any) => ({
      ...prevVals,
      [id]: value,
    }));
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      if (img) {
        const saveImg = await swapImage(
          "home",
          supabase,
          imageName,
          img,
          data[0].imgName
        );
        //img replaced
      }
      const dataResp = await fetch("/api/cms/home", {
        method: "PUT",
        body: JSON.stringify({ form, imageName }),
      });

      if (dataResp.ok) {
        setIsLoading(false);
        setImg(null);
        setImageName("");
        router.refresh();
      }
      //handle error
      else {
        router.push("/error");
      }
    } catch (error) {
      console.log(error);
      router.push("/error");
    }
  };
  //add type

  // const resp = await getTest();
  // if (Array.isArray(resp)) {
  //   const { name, email, phone } = resp[0];
  // if (Array.isArray(data)) {

  // }

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
    color,
  } = form;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap} style={prev}>
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="name"
          >
            {name}
          </h2>

          <h1
            style={{
              borderLeft: `8px solid ${color}`,
            }}
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="profession"
          >
            {profession}
          </h1>
          <div className={styles.btns}>
            <div
              // className={`${styles.buttonHome} ${styles.outline}`}
              className={styles.buttonHome}
              style={{ border: `5px solid ${color}` }}
            >
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

        <div className={styles.banner}>
          {/*TODO: <Banner /> */}
          <div style={{ backgroundColor: color }} className={styles.bannerWrap}>
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
        </div>
      </div>

      <div className={styles.submit}>
        <span>
          <input
            id="img"
            style={{ display: "none" }}
            type="file"
            onChange={imgUpdateHandler}
          />
          <label htmlFor="img">Kép csere</label>
        </span>
        <span>
          <input
            id="color"
            type="color"
            onChange={
              // (e: React.FormEvent<HTMLInputElement>) =>
              // setColor(e.currentTarget.value)
              handleColorChange
            }
            value={color}
          />
          <label>{`Jelenlegi szín: ${color}. Szín változtatás`}</label>
        </span>
        <span>
          <button onClick={submitHandler}>
            <strong>MENTÉS</strong>
          </button>
        </span>
      </div>
    </>
  );
};
export default HomeCMS;
