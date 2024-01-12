import styles from "./loginInput.module.css";
type Props = {
  htmlFor: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
};

const LoginInput: React.FunctionComponent<Props> = ({
  htmlFor,
  type,
  label,
  name,
}) => {
  return (
    <>
      <div className={styles.wrap}>
        <label htmlFor={htmlFor}>{label}</label>
        <input placeholder={label} type={type} name={name} />
      </div>
    </>
  );
};

export default LoginInput;
