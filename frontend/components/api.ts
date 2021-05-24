import jwtDecode from "jwt-decode";

const apiUrl = "https://localhost:5001/api";

export async function fetchJson(

  url: string,
  data: any,
  options: any
): Promise<Response> {
  let res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res;
}

class Api {
  _token: string;
  _userId: string;
  _role: string | string[];

  constructor() {
    if (typeof window !== "undefined") {
      this._token = window.localStorage.getItem("token");
    }
  }

  async login(email: string, password: string, isCourier: boolean): Promise<void> {
    let res = await fetchJson(
      `${apiUrl}/Auth/Login`,
      { email, password, isCourier},
      { method: "POST" }
    );
    this._token = await res.text();
    window.localStorage.setItem("token", this._token);
    let jwt = jwtDecode(this._token);
    this._userId = (jwt as any).sub;
    this._role = (jwt as any).role;

    console.log(this._role);
  }

  async register(
        name: string,
        email: string,
        password: string,
        isCourier: boolean
    ): Promise<any> {
        await fetchJson(
            `${apiUrl}/Auth/Register`,
            { name, email, password, isCourier },
            { method: "POST" }
        );
    }

	async getOrders(): Promise<any> {
		if (!this.signedIn) throw new Error("Not logged in");
		let res = await fetch(`${apiUrl}/Orders/MyOrders`, {
			headers: {
				Authorization: `Bearer ${this._token}`,
			},
		});
		return await res.json();
	}

	async postOrder(data): Promise<any> {
		if (!this.signedIn) throw new Error("Not logged in");
		let res = await fetch(`${apiUrl}/Orders`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${this._token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return res;
	}

	async postCustOrder(data): Promise<any> {
		if (!this.signedIn) throw new Error("Not logged in");
		let res = await fetch(`${apiUrl}/CustOrder`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${this._token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return res;
	}

	async getCourierOrders(): Promise<any> {
		if (!this.signedIn) throw new Error("Not logged in");
		let res = await fetch(`${apiUrl}/Orders/MyShipments`, {
			headers: {
				Authorization: `Bearer ${this._token}`,
			},
		});
		return await res.json();
	}

	async acceptOrder(id: number): Promise<any> {
		if (!this.signedIn) throw new Error("Not logged in");
		let res = await fetch(`${apiUrl}/Orders/AcceptOrder/${id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${this._token}`,
			},
		});
		return res;
	}

	async pickedUpDelivery(id: number): Promise<any> {
		if (!this.signedIn) throw new Error("Not logged in");
		let res = await fetch(`${apiUrl}/Orders/PickedUpOrder/${id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${this._token}`,
			},
		});
		return res;
	}

	async deliveredShipment(id: number): Promise<any> {
		if (!this.signedIn) throw new Error("Not logged in");
		let res = await fetch(`${apiUrl}/Orders/DeliveredOrder/${id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${this._token}`,
			},
		});
		return res;
	}

	async getServices(): Promise<any> {
		let res = await fetch(`${apiUrl}/Services`);
		return await res.json();
	}

  async getAllOrders(): Promise<any> {
    if (!this.signedIn) throw new Error("Not logged in");
    let res = await fetch(`${apiUrl}/Orders`, {
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });
    return await res.json();
  }
  async getAllCustomers(): Promise<any> {
    if (!this.signedIn) throw new Error("Not logged in");
    let res = await fetch(`${apiUrl}/Customers`, {
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });
    return await res.json();
  }
  async getAllCouriers(): Promise<any> {
    if (!this.signedIn) throw new Error("Not logged in");
    let res = await fetch(`${apiUrl}/Couriers`, {
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });
    return await res.json();
  }

	async getPayment(): Promise<any> {
		let res = await fetch(`${apiUrl}/Payment`);
		return await res.json();
	}

	async getAddresses(): Promise<any> {
		let res = await fetch(`${apiUrl}/custAddress/MyAddresses`, {
			headers: {
				Authorization: `Bearer ${this._token}`,
			},
		});
		return await res.json();
	}

	async postAddress(data): Promise<any> {
		let res = await fetch(`${apiUrl}/CustAddress`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${this._token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return res;
	}

	async deleteCustomer(id: string): Promise<any> {
		await fetchJson(`${apiUrl}/Customers/` + id, { id }, { method: "DELETE" });
	}

  async deleteCourier(id: string): Promise<any> {
		await fetchJson(`${apiUrl}/Couriers/` + id, { id }, { method: "DELETE" });
	}

  logout() {
    this._token = undefined;
    this._userId = undefined;
    window.localStorage.removeItem("token");
  }

  get signedIn() {
    return this._token !== undefined;
  }
}

export let api = new Api();
