import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { isRegularExpressionLiteral } from "typescript";

function tommorow() {
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	if (month < 10) month = "0" + month;
	let day = today.getDate() + 1;
	if (day < 10) day = "0" + day;
	let hour = today.getHours();
	if (hour < 10) hour = "0" + hour;
	let minutes = today.getMinutes();
	if (minutes < 10) minutes = "0" + minutes;

	const date = year + "-" + month + "-" + day + "T" + hour + ":" + minutes;

	return date;
}

async function postOrder(data) {
	let url = "https://localhost:44313/api/Orders";
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	console.log(JSON.stringify(data));
	return response;
}

function orderShipmentForm({ onClickSubmit }) {
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	const onSubmit = async (data) => {
		data["customerId"] = 7;
		data["status"] = "pending";
		await postOrder(data).then((res) => {
			if (res.status === 201) {
				router.reload();
			} else console.log(res.status);
		});
	};
	const min = tommorow();
	console.log(min);

	return (
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
						{...register("city", { required: true })}
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
						{...register("zipCode", { required: true })}
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
						{...register("street", { required: true })}
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
						{...register("houseNumber", { required: true })}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
				<div className="grid grid-cols-1">
					<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
						Phone number
					</label>
					<input
						className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						type="text"
						placeholder="Phone number"
						{...register("phoneNumber", { required: true })}
					/>
				</div>
				<div className="grid grid-cols-1">
					<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
						Pickup Date
					</label>
					<input
						type="datetime-local"
						min={min}
						className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						{...register("estDeliveryDate", { required: true })}
					/>
				</div>
			</div>

			<div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
				<input
					type="submit"
					className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
				/>
			</div>
		</form>
	);
}

export default orderShipmentForm;
