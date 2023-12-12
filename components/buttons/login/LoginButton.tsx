import styles from "./loginButton.module.css";
type Props = {
  label: string;
  formAction?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const LoginButton: React.FunctionComponent<Props> = ({
  label,
  formAction,
  type,
}) => {
  return (
    <>
      <button className={styles.wrap} formAction={formAction} type={type}>
        {label}
      </button>
    </>
  );
};

export default LoginButton;
