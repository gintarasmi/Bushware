import Nav from "/components/Nav";
import styles from '../../styles/Statistics.module.css';
import Head from 'next/head';

export default function adminPage() {
  return (
    <div>
      <Nav/>
            <body>
                <table className={styles.deliveryStatusTable}>
                    <h2 className={styles.tableTitle}>
                        Statistics
                    </h2>
                </table>
            </body>
        </div>
      )
}

export async function getStaticProps() {
    const items = [
        { address:"Vilniaus g. 26", delivery_date: "2021-05-05 13:20", status: "Not delivered" },
        { address:"Kauno g. 26", delivery_date: "2021-05-06 13:21", status: "Delivered" },
        { address:"Klaipėdos g. 26", delivery_date: "2021-05-07 13:22", status: "Not delivered" },
        { address:"Alytaus g. 26", delivery_date: "2021-05-08 13:23", status: "Delivered" },
    ];
  
    return {
      props: { items }, // will be passed to the page component as props
    }
}
