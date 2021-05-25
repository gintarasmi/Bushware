import Nav from "/components/CourierNav";
import styles from "../styles/Shipments.module.css";
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
            
            <Nav/>

            <table className={styles.deliveryStatusTable}>
                <thead>
                    <tr>
                        <th className={styles.tableTitle}>
                            Shipments to accept
                        </th>
                    </tr>
                    <tr>
                        <td className={styles.idTitle}>
                            Name
                        </td>
                        <td className={styles.idTitle}>
                            Phone number
                        </td>
                        <td className={styles.deliveryDateTitle}>
                            Pickup Date
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup address
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.servicesTitle}>
                            Payment Method
                        </td>
                        <td className={styles.servicesTitle}>
                            Services
                        </td>
                        <td className={styles.statusTitle}>
                            Weight
                        </td>
                        <td className={styles.servicesTitle}>
                            Price
                        </td>
                        <td className={styles.servicesTitle}></td>
                    </tr>
                </thead>
                <tbody id="ShipmentsToAccept">
                    {items_accept.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.idCol}>
                                {item.name}
                            </td>
                            <td className={styles.idCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.pickupDate)}
                            </td>
                            <td className={styles.addressCol}>
                                {item.pickupAddress}
                            </td>
                            <td className={styles.addressCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.servicesCol}>
                                {item.paymentMethod}
                            </td>
                            <td className={styles.servicesCol}>
                                {item.services}
                            </td>
                            <td className={styles.statusCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.servicesCol}>
                                {item.price} €
                            </td>
                            <td className={styles.servicesCol}>
                                <button className={styles.ShipmentButton} onClick={async () => await acceptDelivery(item)}>
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
                        <td className={styles.idTitle}>
                            Name
                        </td>
                        <td className={styles.idTitle}>
                            Phone number
                        </td>
                        <td className={styles.deliveryDateTitle}>
                            Pickup Date
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup address
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.servicesTitle}>
                            Payment Method
                        </td>
                        <td className={styles.servicesTitle}>
                            Services
                        </td>
                        <td className={styles.statusTitle}>
                            Weight
                        </td>
                        <td className={styles.statusTitle}>
                            Price
                        </td>
                        <td className={styles.servicesTitle}></td>
                    </tr>
                </thead>
                <tbody id="ShipmentsToPickup">
                    {items_pickup.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.idCol}>
                                {item.name}
                            </td>
                            <td className={styles.idCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.pickupDate)}
                            </td>
                            <td className={styles.addressCol}>
                                {item.pickupAddress}
                            </td>
                            <td className={styles.addressCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.servicesCol}>
                                {item.paymentMethod}
                            </td>
                            <td className={styles.servicesCol}>
                                {item.services}
                            </td>
                            <td className={styles.statusCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.statusCol}>
                                {item.price} €
                            </td>
                            <td className={styles.servicesCol}>
                                <button className={styles.ShipmentButton} onClick={async () => await pickedUpDelivery(item)}>
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
                        <td className={styles.idTitle}>
                            Name
                        </td>
                        <td className={styles.idTitle}>
                            Phone number
                        </td>
                        <td className={styles.deliveryDateTitle}>
                            Estimated Delivery Date
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.servicesTitle}>
                            Services
                        </td>
                        <td className={styles.statusTitle}>
                            Weight 
                        </td>
                        <td className={styles.statusTitle}>
                            Price
                        </td>
                        <td className={styles.servicesTitle}></td>
                    </tr>
                </thead>
                <tbody id="ShipmentsInProgress">
                    {items_progress.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.idCol}>
                                {item.name}
                            </td>
                            <td className={styles.idCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.deliveryDate)}
                            </td>
                            <td className={styles.addressCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.servicesCol}>
                                {item.services}
                            </td>
                            <td className={styles.statusCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.statusCol}>
                                {item.price} €
                            </td>
                            <td className={styles.servicesCol}>
                                <button className={styles.ShipmentButton} onClick={async () => await deliveredShipment(item)}>
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
                        <td className={styles.idTitle}>
                            Name
                        </td>
                        <td className={styles.idTitle}>
                            Phone number
                        </td>
                        <td className={styles.deliveryDateTitle}>
                            Pickup Date
                        </td>
                        <td className={styles.addressTitle}>
                            Pickup address
                        </td>
                        <td className={styles.addressTitle}>
                            Delivery address
                        </td>
                        <td className={styles.servicesTitle}>
                            Payment Method
                        </td>
                        <td className={styles.servicesTitle}>
                            Services
                        </td>
                        <td className={styles.statusTitle}>
                            Weight 
                        </td>
                        <td className={styles.servicesTitle}>
                            Price
                        </td>
                    </tr>
                </thead>
                <tbody id="ShipmentsToAccept">
                    {items_done.map((item) => (
                        <tr key={item.orderId}>
                            <td className={styles.idCol}>
                                {item.name}
                            </td>
                            <td className={styles.idCol}>
                                {item.phoneNumber}
                            </td>
                            <td className={styles.deliveryDateCol}>
                                {getCleanDate(item.pickupDate)}
                            </td>
                            <td className={styles.addressCol}>
                                {item.pickupAddress}
                            </td>
                            <td className={styles.addressCol}>
                                {item.shipmentAddress}
                            </td>
                            <td className={styles.servicesCol}>
                                {item.paymentMethod}
                            </td>
                            <td className={styles.servicesCol}>
                                {item.services}
                            </td>
                            <td className={styles.statusCol}>
                                {item.weight} kg
                            </td>
                            <td className={styles.servicesCol}>
                                {item.price} €
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
