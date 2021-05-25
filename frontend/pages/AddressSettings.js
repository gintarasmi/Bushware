import Head from "next/head";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

export default function deliveryStatus() {
	const { register, handleSubmit } = useForm();
	let [err, setErr] = useState(undefined);
	const router = useRouter();

	const onSubmit = async (data) => {
		try {
			await api.postAddress(data);
			router.push("/delivery-status");
		} catch (e) {
			setErr(e.message);
		}
	};

	return (
		<>
			<Head>
				<title>Delivery status page</title>
			</Head>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
					<div className="grid grid-cols-1">
						<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
							City
						</label>
						<input
							className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							type="text"
							placeholder="City"
							{...register("City", { required: true })}
						/>
					</div>
					<div className="grid grid-cols-1">
						<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
							ZIP Code
						</label>
						<input
							className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							type="text"
							placeholder="ZIP Code"
							{...register("ZipCode", { required: true })}
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
					<div className="grid grid-cols-1">
						<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
							Street
						</label>
						<input
							className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							type="text"
							placeholder="Street"
							{...register("Street", { required: true })}
						/>
					</div>
					<div className="grid grid-cols-1">
						<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
							House number
						</label>
						<input
							className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							type="text"
							placeholder="House number"
							{...register("HouseNumber", { required: true })}
						/>
					</div>
				</div>
				<div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
					<input
						type="submit"
						className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
					/>
					{err && <span className={styles.error}>{err}</span>}
				</div>
			</form>
		</>
	);
}
