import styles from "./logoutButton.module.css";
type Props = {};

const LogoutButton: React.FunctionComponent<Props> = () => {
  return (
    <form className={styles.wrap} action="/api/auth/logout" method="post">
      <button type="submit" formAction="/api/auth/logout">
        <h1> Kijelentkezés</h1>
      </button>
    </form>
  );
};

export default LogoutButton;
