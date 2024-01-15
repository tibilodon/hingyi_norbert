import styles from "./page.module.css";

export default async function Check() {
  return (
    <>
      <div className={styles.wrap}>
        <h1>Jelszó-emlékeztető megküldve</h1>
        <h3>Nézd meg az email fiókod</h3>
      </div>
    </>
  );
}
