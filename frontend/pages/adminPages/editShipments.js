import Nav from "/components/Nav";
import styles from "../../styles/Shipments.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { api } from "../../components/api";

function getCleanDate(dateTime){
  return new Date(dateTime).toLocaleString()
}
export default function editShipments() {
	let [items, setItems] = useState([]);

	useEffect(async () => {
		setItems(await api.getAllOrders());
	}, []);

	return (
		<>
			<Head>
				<title>Edit shipments page</title>
			</Head>

			<Nav />

			<table className={styles.deliveryStatusTable}>
				<thead>
					<tr>
						<th className={styles.tableTitle}>All active shipments</th>
					</tr>
					<tr>
            <td className={styles.idTitle}>Shipment ID</td>
						<td className={styles.addressTitle}>Pickup address</td>
						<td className={styles.addressTitle}>Delivery address</td>
						<td className={styles.deliveryDateTitle}>Estimated pickup date</td>
            <td className={styles.deliveryDateTitle}>Estimated delivery date</td>
            <td className={styles.servicesTitle}>Services</td>
            <td className={styles.statusTitle}>Status</td>
					</tr>
				</thead>
				<tbody id="ShipmentsInProgress">
					{items.map((item) => (
						<tr key={item.id}>
              <td className={styles.idCol}>{item.id}</td>
							<td className={styles.addressCol}>
								{item.pickupCity +
									" " +
									item.pickupStreet +
									" " +
									item.pickupHouseNumber +
									" " +
									item.pickupZipCode}
							</td>
							<td className={styles.addressCol}>
								{item.shipmentCity +
									" " +
									item.shipmentStreet +
									" " +
									item.shipmentHouseNumber +
									" " +
									item.shipmentZipCode}
							</td>
              <td className={styles.deliveryDateCol}>{getCleanDate(item.pickupDate)}</td>
							<td className={styles.deliveryDateCol}>{getCleanDate(item.deliveryDate)}</td>
              <td className={styles.servicesCol}>{item.services}</td>
              <td className={styles.statusCol}>{item.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
