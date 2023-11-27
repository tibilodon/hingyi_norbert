import styles from "./regularButton.module.css";

type Props = { label: string; type?: "button" | "submit" | "reset" };

const RegularButton: React.FunctionComponent<Props> = ({ label, type }) => {
  return (
    <>
      <div className={styles.wrap}>
        <button type={type || "button"} className={styles.btn}>
          {label}
        </button>
      </div>
    </>
  );
};

export default RegularButton;
