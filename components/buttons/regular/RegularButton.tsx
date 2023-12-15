import styles from "./regularButton.module.css";

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
  const customCol: React.CSSProperties = {
    backgroundColor: color ? color : "",
  };
  return (
    <>
      <div className={styles.wrap}>
        <button
          type={type || "button"}
          className={styles.btn}
          style={customCol}
        >
          {label}
        </button>
      </div>
    </>
  );
};

export default RegularButton;
