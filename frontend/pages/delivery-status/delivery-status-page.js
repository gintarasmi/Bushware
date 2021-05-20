import styles from '../../styles/Home.module.css'
import Head from 'next/head';
import React from 'react'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import https from 'https'


export default function deliveryStatus({ items_pickup, items_done, items_progress }) {

    const [showModal, setShowModal] = React.useState(false);
    const OrderForm = dynamic(() => import('../../components/OrderForm'))
    const router = useRouter();

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
                                Shipments to pickup
                            </th>
                            <th colSpan="2">
                                <button className={styles.newShipmentButton} onClick={() => setShowModal(true)}>
                                    New shipment
                                </button>
                                {showModal ? (
                                    <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-auto">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Shipment order
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
                                                <OrderForm onClickSubmit={() => setShowModal(false)}/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}
                            </th>
                        </tr>
                        <tr>
                            <td className={styles.addressTitle}>
                                Address
                            </td>
                            <td className={styles.deliveryDateTitle}>
                                Estimated pickup date
                            </td>
                            <td className={styles.statusTitle}>
                                Status
                            </td>
                        </tr>
                    </thead>
                    <tbody id="ShipmentsInProgress">
                        {items_pickup.map((item) => (
                            <tr>
                                <td className={styles.addressCol}>
                                    {item.street + " " +item.houseNumber}
                                </td>
                                <td className={styles.deliveryDateCol}>
                                    {item.estDeliveryDate}
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
                                Shipments in progress
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
                        {items_progress.map((item) => (
                            <tr>
                                <td className={styles.addressCol}>
                                    {item.street + " " +item.houseNumber}
                                </td>
                                <td className={styles.deliveryDateCol}>
                                    {item.estDeliveryDate}
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
                        {items_done.map((item) => (
                            <tr>
                                <td className={styles.addressCol}>
                                    {item.street + " " +item.houseNumber}
                                </td>
                                <td className={styles.deliveryDateCol}>
                                    {item.estDeliveryDate}
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
    const items = await getOrders();
    let items_done = []
    let items_progress = []
    let items_pickup = []
    for(let i in items){
        if(items[i].status==='Done') items_done.push(items[i]) 
        else if(items[i].status==='In progress') items_progress.push(items[i])
        else items_pickup.push(items[i])
    }
    return {
      props: { items_pickup, items_done, items_progress }, // will be passed to the page component as props
    }
  }

  async function getOrders(){
    const customerId = 7
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    let url = 'https://localhost:44313/api/Orders/ByCustomerID/'+customerId
    const response = await fetch(url, {
        method: 'GET',
        agent: httpsAgent
    })
    const data = await response.json();
    return data;
}

  