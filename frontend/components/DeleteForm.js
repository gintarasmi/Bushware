import React from "react";
import { api } from "./api";
import Router from "next/router";

async function customerDelete(id) {
  await api.deleteCustomer(id);
  Router.reload(window.location.pathname);
}
function deleteUserForm({ customerID, onClickConfirm }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
        <div className="grid grid-cols-1">
          Are you sure you want to delete the user {customerID}?
        </div>
      </div>

      <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
        <button
          className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          onClick={() => {
            customerDelete(customerID);
            onClickConfirm();
          }}
        >
          Delete user
        </button>
      </div>
    </>
  );
}

export default deleteUserForm;
