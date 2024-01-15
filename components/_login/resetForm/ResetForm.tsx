import styles from "./resetForm.module.css";
import LoginInput from "../input/LoginInput";
import LoginButton from "@/components/buttons/login/LoginButton";
type Props = {};

const ResetForm: React.FunctionComponent<Props> = () => {
  return (
    <>
      <form className={styles.wrap} action="/api/auth/reset" method="post">
        <LoginInput htmlFor="email" label="E-mail" name="email" type="email" />

        <LoginButton type="submit" label="Emlékeztető küldése" />
      </form>
    </>
  );
};

export default ResetForm;
