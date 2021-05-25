import jwtDecode from "jwt-decode";

const apiUrl = "https://localhost:44313/api";

class Api {
	_token: string;
	_roles: string | string[];

	constructor() {
		if (typeof window !== "undefined") {
			this._setToken(window.localStorage.getItem("token"));
		}
	}

	async login(email: string, password: string, isCourier: boolean): Promise<void> {
		const res = await this._fetch(
			`Auth/Login`,
			{ email, password, isCourier },
			{ method: "POST" }
		);

		this._setToken(await res.text());
		window.localStorage.setItem("token", this._token);
	}

	async register(
		name: string,
		email: string,
		password: string,
		isCourier: boolean
	): Promise<void> {
		await this._fetch(
			`Auth/Register`,
			{ name, email, password, isCourier },
			{ method: "POST" }
		);
	}

	logout() {
		this._setToken(null);
		window.localStorage.removeItem("token");
	}

	hasRole(role: string): boolean {
		if (!this.signedIn) return false;

		if (typeof this._roles === "string" || this._roles instanceof String)
			return this._roles === role;
		else return !!this._roles.find((r) => r === role);
	}

	get signedIn() {
		return this._token !== null && this._token !== undefined;
	}

	async getOrders(): Promise<any> {
		const res = await this._fetch(`Orders/MyOrders`);
		return res.json();
	}

	async postCustOrder(data: any): Promise<any> {
		const res = await this._fetch(`CustOrder`, data, { method: "POST" });
		return res.status;
	}

	async getCourierOrders(): Promise<any> {
		const res = await this._fetch(`Orders/MyShipments`);
		return res.json();
	}

	async acceptOrder(id: number): Promise<any> {
		const res = await this._fetch(`Orders/AcceptOrder/${id}`, undefined, { method: "PUT" });
		return res.status;
	}

	async pickedUpDelivery(id: number): Promise<any> {
		const res = await this._fetch(`Orders/PickedUpOrder/${id}`, undefined, { method: "PUT" });
		return res.status;
	}

	async deliveredShipment(id: number): Promise<any> {
		const res = await this._fetch(`Orders/DeliveredOrder/${id}`, undefined, { method: "PUT" });
		return res.status;
	}

	async getServices(): Promise<any> {
		const res = await this._fetch(`Services`);
		return res.json();
	}

	async getAllOrders(): Promise<any> {
		const res = await this._fetch(`Orders`);
		return res.json();
	}

	async getAllCustomers(): Promise<any> {
		const res = await this._fetch(`Customers`);
		return res.json();
	}

	async getAllCouriers(): Promise<any> {
		const res = await this._fetch(`Couriers`);
		return res.json();
	}

	async getPayment(): Promise<any> {
		const res = await this._fetch(`Payment`);
		return res.json();
	}

	async getAddresses(): Promise<any> {
		const res = await this._fetch(`custAddress/MyAddresses`);
		return res.json();
	}

	async postAddress(data: any): Promise<void> {
		await this._fetch(`CustAddress`, data, { method: "POST" });
	}

	async deleteCustomer(id: string): Promise<void> {
		await this._fetch(`Customers/` + id, { id }, { method: "DELETE" });
	}

	async deleteCourier(id: string): Promise<void> {
		await this._fetch(`Couriers/` + id, { id }, { method: "DELETE" });
	}

	_setToken(token: string | null) {
		this._token = token;
		if (token) {
			const decoded = jwtDecode(this._token);
			this._roles = (decoded as any).role;
		}
	}

	async _fetch(url: string, data?: any, options?: any): Promise<Response> {
		options = {
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			...options,
		};

		if (data) options.body = JSON.stringify(data);

		if (this.signedIn) options.headers.Authorization = `Bearer ${this._token}`;

		let res = await fetch(`${apiUrl}/${url}`, options);

		if (!res.ok) {
			console.error(res);
			throw new Error(await res.text());
		}
		return res;
	}
}

export let api = new Api();
