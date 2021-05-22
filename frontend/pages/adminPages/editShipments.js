import Nav from "/components/Nav";
import styles from "../../styles/Shipments.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { api } from "../../components/api";
import OrderForm from "../../components/OrderForm";

export default function editShipments() {
	const [showModal, setShowModal] = React.useState(false);
	let [items, setItems] = useState([]);
	let items_done = [];
	let items_progress = [];
	let items_pickup = [];
  let items_active = [];
	for (let i in items) {
		if (items[i].status === "Done") items_done.push(items[i]);
		else if (items[i].status === "In progress") items_progress.push(items[i]);
    else if (items[i].status === "Active") items_active.push(items[i]);
		else items_pickup.push(items[i]);
	}

	useEffect(async () => {
		setItems(await api.getAllOrders());
		console.log(items);
	},[]);

	return (
		<>
			<Head>
				<title>Edit shipments page</title>
			</Head>

      <Nav/>

			<table className={styles.deliveryStatusTable}>
				<thead>
					<tr>
						<th className={styles.tableTitle}>All active shipments</th>
						<th colSpan="2">
							{showModal ? (
								<>
									<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
										<div className="relative w-auto">
											{/*content*/}
											<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
												{/*header*/}
												<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
													<h3 className="text-3xl font-semibold">Shipment order</h3>
													<button
														className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
														onClick={() => setShowModal(false)}
													>
														<span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
															×
														</span>
													</button>
												</div>
												<OrderForm onClickSubmit={() => setShowModal(false)} />
											</div>
										</div>
									</div>
									<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
								</>
							) : null}
						</th>
					</tr>
					<tr>
						<td className={styles.addressTitle}>Pickup address</td>
            <td className={styles.addressTitle}>Delivery address</td>
						<td className={styles.deliveryDateTitle}>Estimated pickup date</td>
            <td className={styles.statusTitle}></td>
					</tr>
				</thead>
				<tbody id="ShipmentsInProgress">
					{items_active.map((item) => (
						<tr>
							<td className={styles.addressCol}>
								{item.pickupCity + " " + item.pickupStreet + " " + item.pickupHouseNumber + " " + item.pickupZipCode}
							</td>
              				<td className={styles.addressCol}>
								{item.shipmentCity + " " + item.shipmentStreet + " " + item.shipmentHouseNumber + " " + item.shipmentZipCode}
							</td>
							<td className={styles.deliveryDateCol}>{item.deliveryDate}</td>
							<td>
								<button
								className={styles.ShipmentButton}
								onClick={() => setShowModal(true)}>
								Edit
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}