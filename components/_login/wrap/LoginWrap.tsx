"use client";
import styles from "./loginWrap.module.css";
import LoginButton from "@/components/buttons/login/LoginButton";
import { useEffect } from "react";

type Props = { children: React.ReactNode };

const LoginWrap: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>{children}</div>

        {/* <LoginButton formAction="/api/auth/logout" label="Log out" /> */}
      </div>
    </>
  );
};

export default LoginWrap;
