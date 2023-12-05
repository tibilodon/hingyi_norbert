"use client";
import styles from "./mobileNavbar.module.css";
import Logo from "@/components/logo/Logo";
import menu from "@/public/menu.svg";
import Image from "next/image";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAppProvider } from "@/utils/appContext";

import React from "react";

const MobileNavbar: React.FunctionComponent = () => {
testing out ignore build step
  const { isOpen, setIsOpen } = useAppProvider();
  const toggle = (): void => {
    setIsOpen((prevOpen) => !prevOpen);
  };
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
