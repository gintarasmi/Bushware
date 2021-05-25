import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, { useEffect } from "react";
import { api } from "../components/api";
import OrderForm from "../components/OrderForm";
import ShipmentTable from "../components/ShipmentTable";

export default function deliveryStatus() {
	const [showModal, setShowModal] = React.useState(false);
	const [items, setItems] = React.useState([]);
	let items_done = items.filter((i) => i.status === "Done");
	let items_progress = items.filter((i) => i.status === "In progress");
	let items_pickup = items.filter((i) => i.status === "Accepted");

	useEffect(async () => {
		setItems(await api.getOrders());
	}, []);

	return (
		<>
			<Head>
				<title>Delivery status page</title>
			</Head>
			<button className={styles.newShipmentButton} onClick={() => setShowModal(true)}>
				New shipment
			</button>
			{showModal && (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none mt-52 ...">
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
			)}
			<ShipmentTable tableName="Shipments to pickup" items={items_pickup} />
			<ShipmentTable tableName="Shipments in progress" items={items_progress} />
			<ShipmentTable tableName="Past shipments" items={items_done} />
		</>
	);
}
