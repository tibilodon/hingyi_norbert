"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import React from "react";

type Props = {
  item: {
    created_at: string;
    id: number;
    is_complete: boolean;
    title: string | null;
    user_id: string | null;
  } | null;
};

const Owner: React.FunctionComponent<Props> = ({ item }) => {
  const router = useRouter();

  const setIsComplete = async () => {
    try {
      await fetch("/api/owner", {
        method: "PUT",
        body: JSON.stringify({ id: item?.id }),
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  //delete
  const setDelete = async () => {
    try {
      await fetch("/api/owner", {
        method: "DELETE",
        body: JSON.stringify({ id: item?.id }),
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.owner}>
        <h1>display owner table details</h1>
        {item && (
          <>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.created_at}</p>
            <p>{item.is_complete}</p>
          </>
        )}
        <button onClick={setIsComplete}>set iscomplete true</button>
        <button onClick={setDelete}>DELETE ITEM</button>
      </div>
    </>
  );
};

export default Owner;
