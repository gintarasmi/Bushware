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

    async login(email: string, password: string): Promise<void> {
        let res = await fetchJson(
            `${apiUrl}/Auth/Login`,
            { email, password },
            { method: "POST" }
        );
        this._token = await res.text();
        let jwt = jwtDecode(this._token);
        this._userId = (jwt as any).sub;
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

    async getServices(): Promise<any> {
        // if (!this.signedIn) throw new Error("Not logged in");
        let res = await fetch(`${apiUrl}/Services`, {
            headers: {
                Authorization: `Bearer ${this._token}`,
            },
        });
        return await res.json();
    }
  
    logout() {
        this._token = undefined;
        this._userId = undefined;
    }

    get signedIn() {
        return this._token !== undefined;
    }
}

export let api = new Api();
