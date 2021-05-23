import Nav from "/components/Nav";
import styles from "../../styles/Shipments.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { api } from "../../components/api";

export default function editShipments() {
	let [items, setItems] = useState([]);
	let items_active = items.filter((i) => i.status === "Active");

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
						<td className={styles.addressTitle}>Pickup address</td>
						<td className={styles.addressTitle}>Delivery address</td>
						<td className={styles.deliveryDateTitle}>Estimated pickup date</td>
					</tr>
				</thead>
				<tbody id="ShipmentsInProgress">
					{items_active.map((item) => (
						<tr>
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
							<td className={styles.deliveryDateCol}>{item.deliveryDate}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
