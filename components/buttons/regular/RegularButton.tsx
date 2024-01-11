"use client";
import styles from "./regularButton.module.css";
import { useState } from "react";
import { useAppProvider } from "@/utils/appContext";
import Loading from "@/app/loading";

type Props = {
  label: string | null;
  type?: "button" | "submit" | "reset";
  color?: string | null;
};

const RegularButton: React.FunctionComponent<Props> = ({
  label,
  type,
  color,
}) => {
  const { color: provColor } = useAppProvider();
  const [isHovered, setIsHovered] = useState(false);
  //TODO: useEffect can set color

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  const buttonStyles: React.CSSProperties = {
    backgroundColor: color ? color : provColor,
    transition: "filter 0.3s ease-in-out", // Add a transition for a smooth effect
    filter: isHovered ? "brightness(70%)" : "brightness(100%)", // Adjust brightness for faded effect
  };

  if (!buttonStyles) {
    return <Loading />;
  }

  return (
    <>
      {/* <div className={styles.wrap}> */}
      <button
        onMouseEnter={handleHover}
        onMouseLeave={handleBlur}
        onFocus={handleHover}
        onBlur={handleBlur}
        type={type || "button"}
        className={styles.btn}
        style={buttonStyles}
      >
        {label}
      </button>
      {/* </div>   */}
    </>
  );
};

export default RegularButton;
