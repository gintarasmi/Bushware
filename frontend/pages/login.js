import LoginComponent from "/components/Login";
import Nav from "/components/HomeNav";

export default function Login() {
  return (
    <>
      <Nav />
      <LoginComponent successRedirect="/delivery-status" courierSuccessRedirect="/courierDeliveryStatus" />
    </>
  );
}
