import styles from "./page.module.css";
import ButtonHome from "@/components/buttons/home/ButtonHome";
import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import Banner from "@/components/banner/Banner";

export default function Home() {
  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap}>
          <div className={styles.content}>
            <h2>Hingyi Norbert</h2>
            <h1>Meleg Burkoló</h1>
            <div className={styles.btns}>
              <ButtonHome
                img={contact}
                label="Kapcsolat"
                path="/contact"
                outline={true}
              />
              <ButtonHome
                img={black_phone}
                label="06 20 123 4567"
                outline={false}
              />

              {/*TODO:links to email app, highly inconvenient - nav to contact form and add template text*/}
              <ButtonHome
                img={mail}
                label="Tervek és képek kérése"
                path="/contact"
                outline={false}
              />
            </div>

            <strong>
              Hingyi Norbert pest megyei meleg burkoló 5 év tapasztalattal.
            </strong>
            <ul>
              <li>Magán és céges megrendelőknek</li>
              <li>Bármilyen bonyolultságú és méretű felület burkolása</li>
              <li>Főként Budapesten és körzetében elérhető</li>
            </ul>
          </div>
        </div>

        <span className={styles.test}>
          <Banner />
        </span>
      </div>
    </>
  );
}
