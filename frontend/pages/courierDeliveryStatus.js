import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../components/api";

const OK = 204

function getCleanDate(dateTime){
    return new Date(dateTime).toLocaleString()
}

async function acceptDelivery(item){
    await api.acceptOrder(item.orderId).then((res) =>{
        if(res.status === OK){
            console.log("OK")
        } else console.log(res.status);
    })
}

async function pickedUpDelivery(item){
    await api.pickedUpDelivery(item.orderId).then((res) =>{
        if(res.status === OK){
            console.log("OK")
        } else console.log(res.status)
    })
}

async function deliveredShipment(item){
    await api.deliveredShipment(item.orderId).then((res) =>{
        if(res.status === OK){
            console.log("OK")
        } else console.log(res.status)
    })
}

export default function courierDeliveryStatus() {
    const [items, setItems] = useState([]);
    const router = useRouter();
    let items_done = [];
    let items_accept = [];
    let items_progress = [];
    let items_pickup = [];
    for (let i in items) {
        if (items[i].status === "Done") 
            items_done.push(items[i]);
        else if (items[i].status === "Accepted") 
            items_pickup.push(items[i])
        else if (items[i].status === "In progress")
            items_progress.push(items[i]);
        else items_accept.push(items[i]);
    }

    useEffect(async () => {
        setItems(await api.getCourierOrders())
    }, []);

    return (
        <>
            <Head>
                <title>Courier delivery status page</title>
            </Head>
            <h1 className={styles.subtitle}>Bush Delivery</h1>
            <table className={styles.deliveryStatusTable}>
                <thead>
                    <tr>
                        <th className={styles.tableTitle}>
                            Shipments to accept
                        </th>
                    </tr>
                    <tr>
                        <td className={styles.addressTitle}>
                            Name
                        </td>
                        <td className={styles.addressTitle}>
                            Phone number
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup Date
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup address
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.addressTitle}>
                            Payment Method
                        </td>
                        <td className={styles.addressTitle}>
                            Services
                        </td>
                        <td className={styles.addressTitle}>
                            Weight
                        </td>
                        <td className={styles.addressTitle}>
                            Price
                        </td>
                        <td className={styles.statusTitle}></td>
                    </tr>
                </thead>
                <tbody id="ShipmentsToAccept">
                    {items_accept.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.addressCol}>
                                {item.name}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.pickupDate)}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.pickupAddress}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.paymentMethod}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.services}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.price} €
                            </td>
                            <td className={styles.statusCol}>
                                <button className={styles.newShipmentButton} onClick={async () => await acceptDelivery(item)}>
                                    Accept delivery
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className={styles.deliveryStatusTable}>
                <thead>
                    <tr>
                        <th className={styles.tableTitle}>
                            Shipments to pickup
                        </th>
                    </tr>
                    <tr>
                        <td className={styles.addressTitle}>
                            Name
                        </td>
                        <td className={styles.addressTitle}>
                            Phone number
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup Date
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup address
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.addressTitle}>
                            Payment Method
                        </td>
                        <td className={styles.addressTitle}>
                            Services
                        </td>
                        <td className={styles.addressTitle}>
                            Weight
                        </td>
                        <td className={styles.addressTitle}>
                            Price
                        </td>
                        <td className={styles.statusTitle}></td>
                    </tr>
                </thead>
                <tbody id="ShipmentsToPickup">
                    {items_pickup.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.addressCol}>
                                {item.name}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.pickupDate)}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.pickupAddress}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.paymentMethod}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.services}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.price} €
                            </td>
                            <td className={styles.statusCol}>
                                <button className={styles.newShipmentButton} onClick={async () => await pickedUpDelivery(item)}>
                                    Delivery picked up
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className={styles.deliveryStatusTable}>
                <thead>
                    <tr>
                        <th className={styles.tableTitle}>
                            Shipments to deliver
                        </th>
                    </tr>
                    <tr>
                        <td className={styles.addressTitle}>
                            Name
                        </td>
                        <td className={styles.addressTitle}>
                            Phone number
                        </td>
                        <td className={styles.addressTitle}>
                            Estimated Delivery Date
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.addressTitle}>
                            Services
                        </td>
                        <td className={styles.addressTitle}>
                            Weight 
                        </td>
                        <td className={styles.addressTitle}>
                            Price
                        </td>
                        <td className={styles.statusTitle}></td>
                    </tr>
                </thead>
                <tbody id="ShipmentsInProgress">
                    {items_progress.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.addressCol}>
                                {item.name}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.deliveryDate)}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.services}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.statusCol}>
                                <button className={styles.newShipmentButton} onClick={async () => await deliveredShipment(item)}>
                                    Shipment delivered
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className={styles.deliveryStatusTable}>
                <thead>
                    <tr>
                        <th className={styles.tableTitle}>
                            Past Shipments
                        </th>
                    </tr>
                    <tr>
                        <td className={styles.addressTitle}>
                            Name
                        </td>
                        <td className={styles.addressTitle}>
                            Phone number
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup Date
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup address
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.addressTitle}>
                            Payment Method
                        </td>
                        <td className={styles.addressTitle}>
                            Services
                        </td>
                        <td className={styles.addressTitle}>
                            Weight 
                        </td>
                        <td className={styles.addressTitle}>
                            Price
                        </td>
                        <td className={styles.statusTitle}></td>
                    </tr>
                </thead>
                <tbody id="ShipmentsToAccept">
                    {items_done.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.addressCol}>
                                {item.name}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.pickupDate)}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.pickupAddress}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.paymentMethod}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.services}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {item.price} €
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
