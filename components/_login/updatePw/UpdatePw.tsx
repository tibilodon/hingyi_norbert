"use client";
import styles from "./updatePw.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoginInput from "../input/LoginInput";
import LoginButton from "@/components/buttons/login/LoginButton";
import Loading from "@/app/loading";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Password = {
  pass1: string;
  pass2: string;
};

const UpdatePw: React.FunctionComponent = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<Password>({ pass1: "", pass2: "" });
  const [show, setShow] = useState<boolean>(false);

  const test = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: "qwertz",
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { id, value } = e.currentTarget;
    setPassword((prevVal) => ({
      ...prevVal,
      [id]: value,
    }));
  };

  const showPassword = () => {
    setShow(!show);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (password.pass1 === password.pass2) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: password.pass2,
        });
        if (data) {
          setIsLoading(false);
          router.push("/cms/login/profile");
        }
        if (error) {
          router.push("/error");
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Jelszók nem egyeznek");
      return;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <LoginInput
          onChange={handleChange}
          htmlFor="pass1"
          label="jelszó"
          name="pass1"
          type={!show ? "password" : "text"}
          id="pass1"
        />
        <LoginInput
          onChange={handleChange}
          htmlFor="pass2"
          label="jelszó megerősítése"
          name="pass2"
          id="pass2"
          type={!show ? "password" : "text"}
        />
        <button onClick={showPassword}>{show ? "Elrejt" : "Mutasd"}</button>

        <button onClick={onSubmit}>click</button>
      </div>
    </>
  );
};

export default UpdatePw;
