"use client";
import { useState, FormEvent, useEffect } from "react";
import styles from "./miscCMS.module.css";
import Image from "next/image";
import white_phone from "@/public/white_phone.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import Divider from "@/components/divider/Divider";

const MiscCMS: React.FunctionComponent<any> = ({ data, session }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  if (!session) {
    router.push("/unauthenticated");
  }

  const [form, setForm] = useState(data[0]);
  const [isHovered, setIsHovered] = useState(false);
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
    e:
      | React.FormEvent<HTMLHeadingElement>
      | FormEvent<HTMLLIElement>
      | FormEvent<HTMLButtonElement>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setForm((prevVals: any) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  const handleColorChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    setForm((prevVals: any) => ({
      ...prevVals,
      [id]: value,
    }));
  };
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  const submitHandler = async () => {
    try {
      await fetch("/api/cms/misc", {
        method: "PUT",
        body: JSON.stringify(form),
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <Loading />;
  }

  const { phoneNumber, email, footerText, color } = form;
  const buttonStyles: React.CSSProperties = {
    backgroundColor: color ? color : "",
    transition: "filter 0.3s ease-in-out", // Add a transition for a smooth effect
    filter: isHovered ? "brightness(70%)" : "brightness(100%)", // Adjust brightness for faded effect
  };
  return (
    <>
      <div
        // style={color ? { backgroundColor: color } : {}}
        style={{ backgroundColor: color }}
        className={styles.permaWrap}
      >
        <span>
          <Image
            src={white_phone}
            width={20}
            height={20}
            alt="phone icon"
            className={styles.icon}
          />
          <h4
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="phoneNumber"
          >
            {phoneNumber}
          </h4>
        </span>
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={onChangeHandler}
          id="email"
        >
          {email}
        </p>
      </div>
      <div className={styles.footerWrap}>
        <button
          id="footerText"
          contentEditable
          suppressContentEditableWarning
          onBlur={onChangeHandler}
          className={styles.btn}
          style={buttonStyles}
          onMouseEnter={handleHover}
          onMouseLeave={handleBlur}
          onFocus={handleHover}
        >
          {/* {label} */}
          {footerText}
        </button>
      </div>
      <div className={styles.submit}>
        <span>
          <input
            id="color"
            type="color"
            onChange={handleColorChange}
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

export default MiscCMS;
