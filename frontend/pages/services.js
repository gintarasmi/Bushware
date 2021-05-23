import styles from "../styles/Services.module.css";
import Head from "next/head";
import React, { useEffect } from "react";
import { api } from "../components/api";

export default function services() {
    let [items, setItems] = React.useState([]);

    useEffect(async () => {
        setItems(await api.getServices());
        console.log(items);
    }, []);

    return (
        <>
            <Head>
                <title>Delivery status page</title>
            </Head>
            <table>
                <div>
                    <tr>
                        {items.map((item) => (
                            <td>
                                <div className={styles.columns}>
                                    <ul className={styles.price}>
                                        <li className={styles.header}>
                                            {item.name}
                                        </li>
                                        <li className={styles.grey}>
                                            {item.price}
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        ))}
                    </tr>
                </div>
            </table>
        </>
    );
}
