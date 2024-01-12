"use client";
import Loading from "@/app/loading";
import styles from "./contactCMS.module.css";
import Divider from "@/components/divider/Divider";
import InputForm from "@/components/formInput/inputForm/InputForm";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  user: string;
  data:
    | {
        created_at: string;
        description: string | null;
        hero: string | null;
        id: number;
        updated_at: string | null;
        user_id: string | null;
      }[];
};

const ContactCMS: React.FunctionComponent<Props> = ({ data, user }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  if (!user) {
    router.push("/unauthenticated");
  }
  const [form, setForm] = useState(data[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("realtime contact")
      .on(
        "postgres_changes",
        {
          event: "*", //insert,update,delete
          schema: "public",
          table: "Contact",
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

  if (!data || isLoading) {
    return <Loading />;
  }

  const { description, hero } = form;

  const onChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | React.FormEvent<HTMLLIElement>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setForm((prevVals: any) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  const submitHandler = async () => {
    setIsLoading(true);

    try {
      const resp = await fetch("/api/cms/contact", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      if (resp.ok) {
        setIsLoading(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      router.push("/error");
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={onChangeHandler}
          id="hero"
        >
          {hero}
        </h2>
        <Divider />
        <h4
          contentEditable
          suppressContentEditableWarning
          onBlur={onChangeHandler}
          id="description"
        >
          {description}
        </h4>
        <div className={styles.form}>
          <InputForm />
        </div>
      </div>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          height: "2em",
        }}
      >
        <button onClick={submitHandler}>mentés</button>
      </span>
    </>
  );
};

export default ContactCMS;
