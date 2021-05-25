import Nav from "/components/Nav";
import styles from "../../styles/Home.module.css";

export default function adminPage() {
  return (
    <>
      <Nav />
      <h1 className={styles.description}>You have logged in as an administrator</h1>
      <img src="admin.png" alt="Administrator" className={styles.img}></img>
    </>
  );
}
