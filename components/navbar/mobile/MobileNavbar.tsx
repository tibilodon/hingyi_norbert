"use client";
import styles from "./mobileNavbar.module.css";
import Logo from "@/components/logo/Logo";
import menu from "@/public/menu.svg";
import Image from "next/image";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAppProvider } from "@/utils/appContext";

import React from "react";

type Props = {};

const MobileNavbar = (props: Props) => {
  const { isOpen, setIsOpen } = useAppProvider();
  const toggle = (): void => {
    setIsOpen((prevOpen) => !prevOpen);
  };
  return (
    <>
      <div className={styles.wrap}>
        <Logo />
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
