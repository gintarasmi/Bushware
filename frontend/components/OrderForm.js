import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { api } from "../components/api";

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

function orderShipmentForm({ onClickSubmit }) {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const [servicesPrice, setServicesPrice] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  const [selectedServices] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [payments, setPayments] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);

  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");

  const pickupCity = register("pickupCity", { required: true });
  const pickupZipCode = register("pickupZipCode", { required: true });
  const pickupStreet = register("pickupStreet", { required: true });
  const pickupHouseNumber = register("pickupHouseNumber", { required: true });

  useEffect(() => {
    register("weight", { required: true });
    register("services");
  }, []);

  useEffect(async () => {
    setServices(await api.getServices());
    setPayments(await api.getPayment());
    setAddresses(await api.getAddresses());
  }, []);

  const onSubmit = async (data) => {
    data["price"] = price;
    console.log(JSON.stringify(data));
    await api.postCustOrder(data).then((res) => {
      if (res.status === 200) {
        router.reload();
      } else console.log(res.status);
    });
  };

  const min = tommorow();

  return (
    <>
      <select
        defaultValue={"DEFAULT"}
        onChange={(e) => {
          //someone make it pretty, cause i'm dead
          setCity(addresses[e.target.value].city);
          setValue("pickupCity", addresses[e.target.value].city);
          setZipCode(addresses[e.target.value].zipCode);
          setValue("pickupZipCode", addresses[e.target.value].zipCode);
          setStreet(addresses[e.target.value].street);
          setValue("pickupStreet", addresses[e.target.value].street);
          setHouseNumber(addresses[e.target.value].houseNumber);
          setValue("pickupHouseNumber", addresses[e.target.value].houseNumber);
        }}
      >
        <option
          class="font-semibold text-gray-500"
          key="DEFAULT"
          value="DEFAULT"
          disabled
        >
          Select your address
        </option>
        {addresses.map((address, index) => (
          <option key={index} value={index}>
            {address.street}, {address.houseNumber}, {address.city},{" "}
            {address.zipCode}
          </option>
        ))}
      </select>
      <form
        class="font-semibold text-gray-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div class="m-8 ... p-2 ...">
          Pickup Address
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                City
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="pickupCity"
                value={city}
                placeholder="City"
                onChange={(e) => {
                  setCity(e.target.value);
                  pickupCity.onChange(e);
                }}
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                ZIP Code
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="pickupZipCode"
                value={zipCode}
                placeholder="ZIP Code"
                onChange={(e) => {
                  setZipCode(e.target.value);
                  pickupZipCode.onChange(e);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                Street
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="pickupStreet"
                value={street}
                placeholder="Street"
                onChange={(e) => {
                  setStreet(e.target.value);
                  pickupStreet.onChange(e);
                }}
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                House number
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                value={houseNumber}
                name="pickupHouseNumber"
                placeholder="House number"
                onChange={(e) => {
                  setHouseNumber(e.target.value);
                  pickupHouseNumber.onChange(e);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                Pickup Date
              </label>
              <input
                type="datetime-local"
                min={min}
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                {...register("pickupDate", { required: true })}
              />
            </div>
          </div>
        </div>
        <div class="m-8 ... p-2 ...">
          Shipment Address
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                City
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder="City"
                {...register("shipmentCity", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                ZIP Code
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder="ZIP Code"
                {...register("shipmentZipCode", { required: true })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                Street
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder="Street"
                {...register("shipmentStreet", { required: true })}
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
                {...register("shipmentHouseNumber", { required: true })}
              />
            </div>
          </div>
        </div>

        <div class="m-8 ... p-2 ...">
          Package
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                Weight (kg)
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                min="0"
                step="0.01"
                onChange={(e) => {
                  setPrice(
                    (
                      parseFloat(e.target.value) + parseFloat(servicesPrice)
                    ).toFixed(2)
                  );
                  setValue("weight", e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                Services
              </label>
              <div className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                {services.map((service) => (
                  <div key={service.id}>
                    <label className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        value={service.name}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPrice(
                              (parseFloat(price) + service.price).toFixed(2)
                            );
                            setServicesPrice(
                              (
                                parseFloat(servicesPrice) + service.price
                              ).toFixed(2)
                            );
                            selectedServices.push(e.target.value);
                            console.log(selectedServices);
                          } else {
                            setPrice(
                              (parseFloat(price) - service.price).toFixed(2)
                            );
                            setServicesPrice(
                              (
                                parseFloat(servicesPrice) - service.price
                              ).toFixed(2)
                            );
                            const index = selectedServices.indexOf(
                              e.target.value
                            );
                            selectedServices.splice(index, 1);
                            console.log(selectedServices);
                          }
                          setValue("services", selectedServices);
                        }}
                      />
                      <span className="ml-2 font-normal">
                        {service.name} {service.price}€{" "}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-light">
                Payment method
              </label>
              <div className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                {payments.map((payment) => (
                  <div key={payment.id}>
                    <label className="mt-2 flex items-center">
                      <input
                        {...register("payment", { required: true })}
                        type="radio"
                        value={payment.id}
                      />
                      <span className="ml-2 font-normal">{payment.name} </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
              <div className="grid grid-cols-1">Price: {price}€</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <input
            type="submit"
            className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          />
        </div>
      </form>
    </>
  );
}

export default orderShipmentForm;
