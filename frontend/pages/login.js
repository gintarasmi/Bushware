import Head from "next/head";
import styles from "../styles/Auth.module.css";
import { useForm } from "react-hook-form";
import { api } from "../components/api.ts";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitted, isSubmitSuccessful },
	} = useForm();

	const router = useRouter();
	const onSubmit = async (data) => {
		try {
			await api.login(data.email, data.password);
			clearErrors();
			router.push("/");
		} catch (e) {
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
						Login to <a href="https://nextjs.org">Bushware</a>
					</h1>

					<form onSubmit={handleSubmit(onSubmit)}>
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

						<input type="submit" className={styles.submit} value="Login" />

						{errors.submit && (
							<span className={styles.error}>{errors.submit.message}</span>
						)}

						{isSubmitted && isSubmitSuccessful && (
							<span className={styles.success}>Successfully logged in!</span>
						)}

						<Link href="/register">Don't have an account?</Link>
					</form>
				</main>
			</div>
		</div>
	);
}
