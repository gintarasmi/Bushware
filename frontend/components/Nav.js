import React from 'react';
import Link from "next/link";

export default function Nav() {
    return (
        <div className="py-4 px-8 bg-white text-black flex justify-between">
            <div className="text-2xl items-center"><Link href="/adminPage">Bush delivery</Link></div>
            <div className="flex items-center">
                <div className="ml-8"><Link href="/editAccounts">Edit accounts</Link></div>
                <div className="ml-8"><Link href="/registerACompany">Register a company</Link></div>
                <div className="ml-8"><Link href="/manageShipments">Manage shipments</Link></div>
                <div className="ml-8"><Link href="/findShipmentData">Find shipment data</Link></div>
                <button className="border-2 border-black ml-8 bg-white text-black rounded-lg p-2"><Link href="/signOut">Sign out</Link></button>
            </div>
        </div>
    )
}