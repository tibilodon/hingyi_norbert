"use client";
import styles from "./linker.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppProvider } from "@/utils/appContext";

type Props = { path: string; label: string };

const Liker: React.FunctionComponent<Props> = ({ path, label }) => {
  const { color } = useAppProvider();
  const pathname = usePathname();

  // const styler = (): string => {
  //   if (path === pathname) {
  //     return `${styles.active}`;
  //   } else {
  //     return `${styles.inactive}`;
  //   }
  // };

  // const styler = (): string => {
  //   if (path === pathname) {
  //     return   {`kgj`};
  //   } else {
  //     return {`${styles.inactive}`};
  //   }
  // };
  return (
    <>
      <Link href={path}>
        <h4
          style={
            path === pathname
              ? { color: `${color}` }
              : { color: "var(--black)" }
          }
        >
          {label}
        </h4>
      </Link>
    </>
  );
};

export default Liker;
