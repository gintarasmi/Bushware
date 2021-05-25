import Link from "next/link";
import { api } from "./api";
import styles from "../styles/Home.module.css";

function AuthButton() {
	return api.signedIn ? (
		<button
			className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2"
			onClick={() => api.logout()}
		>
			<Link href="/">Sign out</Link>
		</button>
	) : (
		<>
			<button className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2">
				<Link href="/login">Login</Link>
			</button>
			<button className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2">
				<Link href="/register">Sign Up</Link>
			</button>
		</>
	);
}

function AdminNav() {
	return (
		<header className="bg-white text-black flex justify-between">
			<div className={styles.subtitle}>
				<Link href="/adminPages">Bush delivery</Link>
			</div>
			<div className="py-4 px-8 flex items-center">
				<div className="ml-8">
					<Link href="/adminPages/editAccounts">Edit accounts</Link>
				</div>
				<div className="ml-8">
					<Link href="/adminPages/editShipments">Edit shipments</Link>
				</div>

				<AuthButton />
			</div>
		</header>
	);
}

function CourierNav() {
	return (
		<header className="bg-white text-black flex justify-between">
			<div className={styles.subtitle}>
				<Link href="/courierDeliveryStatus">Bush delivery</Link>
			</div>
			<div className="py-4 px-8 flex items-center">
				<AuthButton />
			</div>
		</header>
	);
}

function UserNav() {
	return (
		<header className="bg-white text-black flex justify-between">
			<div className={styles.subtitle}>
				<Link href="/">Bush delivery</Link>
			</div>
			<div className="py-4 px-8 flex items-center">
				{api.signedIn && (
					<>
						<div className="ml-8">
							<Link href="/delivery-status">Your packages</Link>
						</div>
						<div className="ml-8">
							<Link href="/services">Prices</Link>
						</div>
						<div className="ml-8">
							<Link href="/AddressSettings">Add an address</Link>
						</div>
					</>
				)}

				<AuthButton />
			</div>
		</header>
	);
}

export default function Nav() {
	return api.hasRole("admin") ? (
		<AdminNav />
	) : api.hasRole("courier") ? (
		<CourierNav />
	) : (
		<UserNav />
	);
}
