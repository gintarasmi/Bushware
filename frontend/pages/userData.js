import Nav from "/components/UserNav";
import AddressForm from "/components/AddressForm";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import React, { useEffect } from "react";
import { api } from "../components/api";
import OrderForm from "../components/OrderForm";
import ShipmentTable from "../components/ShipmentTable"

export default function deliveryStatus() {
	const [showModal, setShowModal] = React.useState(false);
	const [items, setItems] = React.useState([]);
	let items_done = [];
	let items_progress = [];
	let items_pickup = [];
	for (let i in items) {
		if (items[i].status === "Done") items_done.push(items[i]);
		else if (items[i].status === "In progress") items_progress.push(items[i]);
		else items_pickup.push(items[i]);
	}

	useEffect(async () => {
		setItems(await api.getOrders())
	}, []);

	return (
		<>
			<Head>
				<title>Delivery status page</title>
			</Head>
			<Nav/>
            <AddressForm/>
	</>		
	);
}
