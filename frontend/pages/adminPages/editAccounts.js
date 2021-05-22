import Nav from "/components/Nav";
import styles from '../../styles/Accounts.module.css';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import { api } from "../../components/api";

async function customerDelete(id){
    await api.deleteCustomer(id);
}
export default function editAccounts() {
	let [items, setItems] = useState([]);
	let customers = [];
	for (let i in items) {
		customers.push(items[i]);
	}
    useEffect(async () => {
		setItems(await api.getAllCustomers());
		console.log(items);
	},[]);
  return (
    <div>
      <Nav/>
        <Head>
            <title>Delivery status page</title>
        </Head>
        <body>
            <table className={styles.registeredAccountsTable}>
                <thead>
                    <tr>
                        <th className={styles.tableTitle}>
                            Registered accounts
                        </th>
                    </tr>
                    <tr>
                        <td className={styles.idTitle}>
                            ID
                        </td>
                        <td className={styles.nameTitle}>
                            Name
                        </td>
                        <td className={styles.emailTitle}>
                            Email
                        </td>
                        <td className={styles.statusTitle}>
                        </td>
                    </tr>
                </thead>
                <tbody id="RegisteredAccounts">
                    {customers.map((customer) => (
                        <tr>
                            <td className={styles.idCol}>
                                {customer.id}
                            </td>
                            <td className={styles.nameCol}>
                                {customer.name}
                            </td>
                            <td className={styles.emailCol}>
                                {customer.email}
                            </td>
                            <td>
                              <button className={styles.deleteUserButton} onClick={() => customerDelete(customer.id)}>
                                  Delete user  
			                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </body>
    </div>
  )
}
