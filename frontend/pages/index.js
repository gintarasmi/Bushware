import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomeNav from "/components/HomeNav";

export default function Home() {
	return(
		<>
			<HomeNav/>
			<h1 className={styles.title}>Bush delivery</h1>
			<img src="bushandtree.png" alt="Bush delivery" className={styles.center}></img>
			<h1 className={styles.description}>Your most trustworthy delivery service provider</h1>
		</>
	);
}
