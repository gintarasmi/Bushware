import Nav from "/components/Nav";
import Head from "next/head";
import styles from "../../styles/Accounts.module.css";
import { useEffect, useState } from "react";
import { api } from "../../components/api";

function DeleteUserForm({ customerID, onCancel, onConfirm }) {
	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
							<h3 className="text-3xl font-semibold">User deletion</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
								onClick={onCancel}
							>
								<span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
									×
								</span>
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
							<div className="grid grid-cols-1">
								Are you sure you want to delete the user {customerID}?
							</div>
						</div>

						<div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
							<button
								className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
								onClick={onConfirm}
							>
								Delete user
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
}

export default function editAccounts() {
	const [customerToDelete, setCustomerToDelete] = useState();
	let [customers, setCustomers] = useState([]);
  let [couriers, setCouriers] = useState([]);
	useEffect(async () => {
		setCustomers(await api.getAllCustomers());
    setCouriers(await api.getAllCouriers());
	}, []);

	return (
		<>
			<Nav />
			<Head>
				<title>User edit page</title>
			</Head>
			<table className={styles.registeredAccountsTable}>
				<thead>
					<tr>
						<th className={styles.tableTitle}>Registered users</th>
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
										setCustomerToDelete(customer);
									}}
								>
									Delete user
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
      <table className={styles.registeredCouriersTable}>
				<thead>
					<tr>
						<th className={styles.tableTitle}>Registered couriers</th>
					</tr>
					<tr>
						<td className={styles.idTitle}>ID</td>
						<td className={styles.nameTitle}>Name</td>
						<td className={styles.emailTitle}>Email</td>
						<td className={styles.statusTitle}></td>
					</tr>
				</thead>
				<tbody id="RegisteredCouriers">
					{couriers.map((customer) => (
						<tr key={customer.id}>
							<td className={styles.idCol}>{customer.id}</td>
							<td className={styles.nameCol}>{customer.name}</td>
							<td className={styles.emailCol}>{customer.email}</td>
							<td>
								<button
									className={styles.deleteUserButton}
									onClick={() => {
										setCustomerToDelete(customer);
									}}
								>
									Delete courier
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{customerToDelete && (
				<DeleteUserForm
					customerID={customerToDelete.id}
					onCancel={() => setCustomerToDelete(undefined)}
					onConfirm={async () => {
						await api.deleteCustomer(customerToDelete.id);
						setCustomers(customers.filter((c) => c.id !== customerToDelete.id));
						setCustomerToDelete(undefined);
					}}
				/>
			)}
		</>
	);
}
