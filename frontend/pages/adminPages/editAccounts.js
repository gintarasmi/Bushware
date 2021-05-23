import Nav from "/components/Nav";
import styles from "../../styles/Accounts.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { api } from "../../components/api";
import DeleteForm from "../../components/DeleteForm";

export default function editAccounts() {
  const [showModal, setShowModal] = React.useState(false);
  const [currentCustomer, setCurrentCustomerId] = useState();
  let [customers, setItems] = useState([]);
  useEffect(async () => {
    setItems(await api.getAllCustomers());
  }, []);
  console.log(customers);
  return (
    <>
      <Nav />
      <Head>
        <title>User edit page</title>
      </Head>
      <table className={styles.registeredAccountsTable}>
        <thead>
          <tr>
            <th className={styles.tableTitle}>Registered accounts</th>
            <th>
              {showModal && (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            User deletion
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        <DeleteForm
                          customerID={currentCustomer}
                          onClickConfirm={() => setShowModal(false)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              )}
            </th>
          </tr>
          <tr>
            <td className={styles.idTitle}>ID</td>
            <td className={styles.nameTitle}>Name</td>
            <td className={styles.emailTitle}>Email</td>
            <td className={styles.statusTitle}></td>
          </tr>
        </thead>
        <tbody id="RegisteredAccounts">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className={styles.idCol}>{customer.id}</td>
              <td className={styles.nameCol}>{customer.name}</td>
              <td className={styles.emailCol}>{customer.email}</td>
              <td>
                <button
                  className={styles.deleteUserButton}
                  onClick={() => {
                    setShowModal(true);
                    setCurrentCustomerId(customer.id);
                  }}
                >
                  Delete user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
