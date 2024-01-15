import styles from "./loginInput.module.css";
type Props = {
  htmlFor: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
  onChange?: (e: any) => void;
  id?: string;
};

const LoginInput: React.FunctionComponent<Props> = ({
  htmlFor,
  type,
  label,
  name,
  id,
  onChange,
}) => {
  return (
    <>
      <div className={styles.wrap}>
        <label htmlFor={htmlFor}>{label}</label>
        <input
          onChange={onChange}
          placeholder={label}
          type={type}
          name={name}
          id={id}
        />
      </div>
    </>
  );
};

export default LoginInput;
