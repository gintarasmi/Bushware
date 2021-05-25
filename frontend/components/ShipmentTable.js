import styles from "../styles/Shipments.module.css";

function ShipmentTable({tableName, items}){
    let pastShipments = false 
    if(tableName.toLowerCase() === "past shipments") pastShipments = true
    return(
        <table className={styles.deliveryStatusTable}>
            <thead>
                <tr>
                    <th className={styles.tableTitle}>{tableName}</th>
                </tr>
                <tr>
                    <td className={styles.addressTitle}>Pickup Address</td>
                    <td className={styles.addressTitle}>Shipment Address</td>
                    <td className={styles.deliveryDateTitle}>Pickup Date</td>
                    {pastShipments ? 
                    (<td className={styles.deliveryDateTitle}>Delivery Date</td>) :
                    (<td className={styles.deliveryDateTitle}>Estimated Delivery Date</td>)}
                    <td className={styles.statusTitle}>Services</td>
                    <td className={styles.statusTitle}>Payment Method</td>
                    <td className={styles.statusTitle}>Weight</td>
                    <td className={styles.statusTitle}>Price</td>
                    <td className={styles.statusTitle}>Status</td>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index)=>(
                    <tr key={index}>
                        <td className={styles.addressCol}>
                            {item.pickupAddress}
                        </td>
                        <td className={styles.addressCol}>
                            {item.shipmentAddress}
                        </td>
                        <td className={styles.deliveryDateCol}>
                            {getCleanDate(item.pickupDate)}
                        </td>
                        <td className={styles.deliveryDatecol}>
                            {getCleanDate(item.deliveryDate)}
                        </td>
                        <td className={styles.statusCol}>
                            {item.services}
                        </td>
                        <td className={styles.statusCol}>
                            {item.paymentMethod}
                        </td>
                        <td className={styles.statusCol}>
                            {item.weight} kg
                        </td>
                        <td className={styles.statusCol}>
                            {item.price}€
                        </td>
                        <td className={styles.statusCol}>
                            {item.status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function getCleanDate(dateTime){
    return new Date(dateTime).toLocaleString()
}

export default ShipmentTable;