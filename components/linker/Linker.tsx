"use client";
import styles from "./linker.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = { path: string; label: string };

const Linker: React.FunctionComponent<Props> = ({ path, label }) => {
  const pathname = usePathname();

  const styler = (): string => {
    if (path === pathname) {
      return `${styles.active}`;
    } else {
      return `${styles.inactive}`;
    }
  };
  return (
    <>
      <div className={styles.wrap}>
        <Link href={path}>
          <h4 className={styler()}>{label}</h4>
        </Link>
      </div>
    </>
  );
};

export default Linker;
