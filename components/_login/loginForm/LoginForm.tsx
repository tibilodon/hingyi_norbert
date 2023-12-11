import styles from "./loginForm.module.css";
type Props = {};

const LoginForm = (props: Props) => {
  return (
    <>
      <div className={styles.wrap}>
        <h1>loginform</h1>
        <form action="/api/auth/login" method="post">
          <label htmlFor="email">Email</label>
          <input name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button>Sign In</button>
          <button formAction="/api/auth/sign-up">Sign Up</button>
          <button formAction="/api/auth/logout">Log Out</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
