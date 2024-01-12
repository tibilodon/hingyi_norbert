import styles from "./loginForm.module.css";
import LoginInput from "../input/LoginInput";
import LoginButton from "@/components/buttons/login/LoginButton";
type Props = {};

const LoginForm: React.FunctionComponent<Props> = () => {
  return (
    <>
      <form className={styles.wrap} action="/api/auth/login" method="post">
        <LoginInput htmlFor="email" label="E-mail" name="email" type="email" />
        <LoginInput
          htmlFor="password"
          label="Password"
          name="password"
          type="password"
        />
        <LoginButton type="submit" label="Bejelentkezés" />
        {/* <LoginButton formAction="/api/auth/sign-up" label="Sign Up" /> */}
      </form>
    </>
  );
};

export default LoginForm;
