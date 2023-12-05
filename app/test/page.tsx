import TestForm from "./TestForm";
import styles from "./page.module.css";
import img from "@/public/landing_2.jpg";
import { getTest } from "../api/test/route";

export default async function Test() {
  const resp = await getTest();
  if (Array.isArray(resp)) {
    // Now you can safely use resp as fasz type
    const firstImage = resp;
    console.log(firstImage);
    // Further processing with 'firstImage' if needed
  } else {
    // Handle error response here
    console.log("Error response-----------------------------:", resp);
  }
  return (
    <>
      <div className={styles.wrap}>
        <h1>hello test</h1>
        <TestForm img={img.src} />
      </div>
    </>
  );
}
