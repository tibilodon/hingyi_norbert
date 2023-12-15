"use client";
import styles from "./mobileNavbar.module.css";
import Logo from "@/components/logo/Logo";
import menu from "@/public/menu.svg";
import Image from "next/image";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAppProvider } from "@/utils/appContext";
import { Miscellaneous } from "@/utils/commonTypes";
import { useEffect } from "react";

import React from "react";

const MobileNavbar: React.FunctionComponent<Miscellaneous> = ({ data }) => {
  const { isOpen, setIsOpen, setColor } = useAppProvider();
  const toggle = (): void => {
    setIsOpen((prevOpen) => !prevOpen);
  };
  useEffect(() => {
    if (Array.isArray(data) && data[0].color) {
      setColor(data[0].color);
    }
  }, [data, setColor]);

  return (
    <>
      <div className={styles.wrap}>
        <span onClick={() => setIsOpen(false)}>
          <Logo />
        </span>
        <Image
          onClick={toggle}
          src={menu}
          alt="menu icon"
          className={styles.icon}
        />
      </div>
      <div
        className={
          isOpen ? `${styles.sidebar} ${styles.active}` : styles.sidebar
        }
      >
        <div className={styles.content} onClick={toggle}>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
