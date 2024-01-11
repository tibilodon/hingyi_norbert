"use client";
import { useAppProvider } from "@/utils/appContext";
import styles from "./divider.module.css";

type Props = {};
const Divider: React.FunctionComponent<Props> = () => {
  const { color } = useAppProvider();
  //TODO: add style from misc -- home should set it
  const colorStyle: React.CSSProperties = {
    // border-bottom: 5px solid var(--orange2);
    borderBottom: `5px solid ${color}`,
  };
  return (
    <>
      <div style={colorStyle} className={styles.wrap}></div>
    </>
  );
};

export default Divider;
