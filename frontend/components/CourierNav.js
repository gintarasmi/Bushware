import React from "react";
import Link from "next/link";
import { api } from "./api";
import styles from '../styles/Home.module.css';

export default function CourierNav() {
	return (
		<div className="bg-white text-black flex justify-between">
			<div className={styles.subtitle}>
				<Link href="/courierDeliveryStatus">Bush delivery</Link>
			</div>
			<div className="py-4 px-8 flex items-center">
				<button className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2">
					<Link href="/" onClick={() => api.logout()}>
						{api.signedIn ? "Sign out" : "Log in"}
					</Link>
				</button>
			</div>
		</div>
	);
}