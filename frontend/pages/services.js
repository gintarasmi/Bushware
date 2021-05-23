import Nav from "/components/UserNav";
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
        <title>Prices page</title>
      </Head>
      <Nav />
      <h1 className={styles.title}>Our Prices</h1>
      <table className={styles.columns}>
        <thead>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>
                <div className={styles.columns}>
                  <ul className={styles.price}>
                    <li className={styles.header}>{item.name}</li>
                    <li className={styles.grey}>{item.price}€</li>
                  </ul>
                </div>
              </td>
              <td className={styles.statusCol}>
                <img
                  src="box.png"
                  alt="Delivery box"
                  className={styles.center}
                ></img>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className={styles.description}>
        We care about our customers very much so we try to provide the best
        pricing possible!
      </h1>
    </>
  );
}
