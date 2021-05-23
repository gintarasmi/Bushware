import React from "react";
import Link from "next/link";
import styles from '../styles/Home.module.css';

export default function HomeNav() {
	return (
		<div className="bg-white text-black flex justify-between">
			<div className={styles.subtitle}>
				<Link href="/">Bush delivery</Link>
			</div>
			<div className="py-4 px-8 flex items-center">
				<button className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2">
					<Link href="/login">User log in</Link>
				</button>
                <button className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2">
					<Link href="/adminLogin">Admin log in</Link>
				</button>
				<button className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2">
					<Link href="/register">Register</Link>
				</button>
			</div>
		</div>
	);
}