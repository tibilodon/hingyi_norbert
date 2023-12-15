"use client";
import styles from "./regularButton.module.css";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  const buttonStyles: React.CSSProperties = {
    backgroundColor: color ? color : "",
    transition: "filter 0.3s ease-in-out", // Add a transition for a smooth effect
    filter: isHovered ? "brightness(70%)" : "brightness(100%)", // Adjust brightness for faded effect
  };
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
