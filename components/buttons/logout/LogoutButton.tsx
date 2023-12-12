import styles from "./logoutButton.module.css";
type Props = {};

const LogoutButton: React.FunctionComponent<Props> = () => {
  return (
    <form className={styles.wrap} action="/api/auth/logout" method="post">
      <button type="submit" formAction="/api/auth/logout">
        Log Out
      </button>
    </form>
  );
};

export default LogoutButton;
