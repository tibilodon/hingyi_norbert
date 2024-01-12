"use client";
import styles from "./cmsSidebar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CMSSidebar: React.FunctionComponent = () => {
  const pathname = usePathname();
  const styler = (): string => {
    if (
      !pathname.includes("cms") ||
      pathname.includes("login") ||
      !pathname.includes("unauthenticated")
    ) {
      return `${styles.hide}`;
    } else {
      return `${styles.wrap}`;
    }
  };
  return (
    <div className={styler()}>
      <Link href={"/cms/home"}>Főoldal</Link>
      <Link href={"/cms/portfolio"}>Portfólió</Link>
      <Link href={"/cms/about"}>Rólam</Link>
      <Link href={"/cms/contact"}>Kapcsolat</Link>
      <Link href={"/cms/misc"}>Egyéb</Link>
    </div>
  );
};

export default CMSSidebar;
