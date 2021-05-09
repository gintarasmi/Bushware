import Head from "next/head";
import styles from "../styles/Auth.module.css";
import { useForm } from "react-hook-form";
import { api } from "../components/api.ts";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitted, isSubmitSuccessful },
	} = useForm();
	const onSubmit = async (data) => {
		try {
			await api.register(data.name, data.email, data.password);
			clearErrors();
		} catch (e) {
			console.log(e);
			setError("submit", { type: "string", message: e.message });
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Bushware - Registration</title>
				<meta name="description" content="Bushware Registration Page" />
			</Head>

			<div className={styles.flex}>
				<main className={styles.main}>
					<h1 className={styles.title}>
						Registration to <a href="https://nextjs.org">Bushware</a>
					</h1>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.field}>
							<label htmlFor="name">name</label>
							<input
								type="text"
								id="name"
								name="name"
								{...register("name", { required: true })}
							/>
							{errors.name && (
								<span className={styles.error}>Please enter a valid name</span>
							)}
						</div>

						<div className={styles.field}>
							<label htmlFor="email">email</label>
							<input
								type="email"
								id="email"
								name="email"
								{...register("email", { required: true })}
							/>
							{errors.email && (
								<span className={styles.error}>Please enter a valid email</span>
							)}
						</div>

						<div className={styles.field}>
							<label htmlFor="email">password</label>
							<input
								type="password"
								id="password"
								name="password"
								{...register("password", { required: true, minLength: 3, maxLength: 32 })}
							/>
							{errors.password && (
								<span className={styles.error}>Please enter a valid password</span>
							)}
						</div>

						<input type="submit" className={styles.submit} value="Register" />

						{errors.submit && (
							<span className={styles.error}>{errors.submit.message}</span>
						)}

						{isSubmitted && isSubmitSuccessful && (
							<span className={styles.success}>
								Successfully registered! <Link href="/login">Login now</Link>
							</span>
						)}
					</form>
				</main>
			</div>
		</div>
	);
}
