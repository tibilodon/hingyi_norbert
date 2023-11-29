"use client";
import styles from "./inputForm.module.css";
import Image from "next/image";
// import arrow from "../../public/arrow.svg";
// import logo from "../../public/tt.png";
import Input from "@/components/formInput/input/Input";
import XTextfield from "../xTextfield/XTextfield";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import ErrorContent from "@/components/error/ErrorContent";
import RegularButton from "@/components/buttons/regular/RegularButton";

const InputForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  //form
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    text: "",
  });

  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.currentTarget;
    setForm((prevVals) => ({
      ...prevVals,
      [id]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    setIsLoading(true);
    try {
      const { name, phone, email, title, text } = form;
      let data = {
        subject: ` --Portfólió új üzenet-- ${title}`,
        text: text,
        html: `<b>Név: ${name}</b><br>
         <b>E-mail cím: ${email}</b><br>
         <b>Telefonszám: ${phone}</b><br>`,
      };
      const response = await fetch("/submit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push("/thankyou");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  //TODO:add error page
  if (error) {
    return (
      <>
        <ErrorContent />
      </>
    );
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.form}>
          <form onSubmit={submitHandler}>
            {/*email alert*/}

            <Input
              type={"text"}
              placeholder={"Név"}
              onChangeHandler={onChangeHandler}
              id={"name"}
            />

            <Input
              type={"email"}
              placeholder={"E-mail cím"}
              id={"email"}
              onChangeHandler={onChangeHandler}
            />
            <Input
              type={"tel"}
              placeholder={"Telefonszám"}
              onChangeHandler={onChangeHandler}
              id={"phone"}
            />
            <Input
              type={"text"}
              placeholder={"Tárgy"}
              onChangeHandler={onChangeHandler}
              id={"title"}
            />
            <XTextfield
              id={"text"}
              val={form.text}
              onChangeHandler={onChangeHandler}
              placeHolder={"Üzenet"}
            />
            <div className={styles.submit}>
              {/* <button type="submit">Send Enquiry</button> */}
              <RegularButton type="submit" label="Küldés" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputForm;
