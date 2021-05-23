import Nav from "/components/Nav";
import styles from "../../styles/Statistics.module.css";

export default function adminPage() {
  return (
    <div>
      <Nav />
      <table className={styles.deliveryStatusTable}>
        <h2 className={styles.tableTitle}>Statistics</h2>
      </table>
    </div>
  );
}
