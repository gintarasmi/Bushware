import styles from "../styles/Shipments.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { api } from "../components/api";
import {useRouter} from 'next/router'

async function acceptDelivery(item) {
	const status = await api.acceptOrder(item.orderId);
	return status;
}

async function pickedUpDelivery(item) {
	const status = await api.pickedUpDelivery(item.orderId);
	return status;
}

async function deliver(item) {
	const status = await api.deliveredShipment(item.orderId);
	return status;
}

function getCleanDate(dateTime) {
	return new Date(dateTime).toLocaleString();
}

function ItemsTable({ title, items, action, actionTitle }) {
	const router = useRouter();
	return (
		<>
			<h2 className={styles.tableTitle}>{title}</h2>
			<table className={styles.deliveryStatusTable}>
				<thead>
					<tr>
						<td className={styles.idTitle}>Name</td>
						<td className={styles.idTitle}>Phone number</td>
						<td className={styles.deliveryDateTitle}>Pickup Date</td>
						<td className={styles.addressTitle}>Pickup address</td>
						<td className={styles.addressTitle}>Delivery address</td>
						<td className={styles.servicesTitle}>Payment Method</td>
						<td className={styles.servicesTitle}>Services</td>
						<td className={styles.statusTitle}>Weight</td>
						<td className={styles.servicesTitle}>Price</td>
						<td className={styles.servicesTitle}></td>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.orderId}>
							<td className={styles.idCol}>{item.name}</td>
							<td className={styles.idCol}>{item.phoneNumber}</td>
							<td className={styles.deliveryDateCol}>{getCleanDate(item.pickupDate)}</td>
							<td className={styles.addressCol}>{item.pickupAddress}</td>
							<td className={styles.addressCol}>{item.shipmentAddress}</td>
							<td className={styles.servicesCol}>{item.paymentMethod}</td>
							<td className={styles.servicesCol}>{item.services}</td>
							<td className={styles.statusCol}>{item.weight} kg</td>
							<td className={styles.servicesCol}>{item.price} €</td>

							{action && (
								<td className={styles.servicesCol}>
									<button className={styles.ShipmentButton} onClick={async ()=> {
																				const status = await action(item)
																				if(status == 204) router.reload();
																			}}>
										{actionTitle}
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default function courierDeliveryStatus() {
	const [items, setItems] = useState([]);
	let done = items.filter((i) => i.status === "Done");
	let accepted = items.filter((i) => i.status === "Accepted");
	let in_progress = items.filter((i) => i.status === "In progress");
	let pending = items.filter((i) => i.status === "Pending");

	useEffect(async () => {
		setItems(await api.getCourierOrders());
	}, []);

	return (
		<>
			<Head>
				<title>Courier delivery status page</title>
			</Head>

			<ItemsTable
				title="Unassigned shipments"
				items={pending}
				action={acceptDelivery}
				actionTitle="Accept"
			/>
			<ItemsTable
				title="Ready for pickup"
				items={accepted}
				action={pickedUpDelivery}
				actionTitle="Pick up"
			/>
			<ItemsTable
				title="In progress"
				items={in_progress}
				action={deliver}
				actionTitle="Deliver"
			/>
			<ItemsTable title="Delivered" items={done} action={undefined} />
		</>
	);
}
