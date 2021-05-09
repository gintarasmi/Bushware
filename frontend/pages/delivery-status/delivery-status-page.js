import styles from '../../styles/Home.module.css'
import Head from 'next/head';

export default function deliveryStatus({ items }) {
    return (
        <div>
            <Head>
                <title>Delivery status page</title>
            </Head>
            <body>
                <h1 className={styles.subtitle}>
                    Bush Delivery
                </h1>
                <table className={styles.deliveryStatusTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableTitle}>
                                Shipments in progress
                            </th>
                            <th colSpan="2">
                                <button className={styles.newShipmentButton}>
                                New shipment
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <td className={styles.addressTitle}>
                                Address
                            </td>
                            <td className={styles.deliveryDateTitle}>
                                Estimated delivery date
                            </td>
                            <td className={styles.statusTitle}>
                                Status
                            </td>
                        </tr>
                    </thead>
                    <tbody id="ShipmentsInProgress">
                        {items.map((item) => (
                            <tr>
                                <td className={styles.addressCol}>
                                    {item.address}
                                </td>
                                <td className={styles.deliveryDateCol}>
                                    {item.delivery_date}
                                </td>
                                <td className={styles.statusCol}>
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className={styles.deliveryStatusTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableTitle}>
                                Past shipments
                            </th>
                        </tr>
                        <tr>
                            <td className={styles.addressTitle}>
                                Address
                            </td>
                            <td className={styles.deliveryDateTitle}>
                                Estimated delivery date
                            </td>
                            <td className={styles.statusTitle}>
                                Status
                            </td>
                        </tr>
                    </thead>
                    <tbody id="PastShipments">
                        {items.map((item) => (
                            <tr>
                                <td className={styles.addressCol}>
                                    {item.address}
                                </td>
                                <td className={styles.deliveryDateCol}>
                                    {item.delivery_date}
                                </td>
                                <td className={styles.statusCol}>
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
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
  