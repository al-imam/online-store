"use client";

import { FormEvent } from "react";
import { countries } from "countries-list";
import useObjectStore from "use-object-store";
import useAddress from "@/context/AddressProvider";
import { toast } from "react-toastify";

const countriesList = Object.values(countries).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const init = {
  street: "",
  city: "",
  state: "",
  zip: "",
  phone: countries.BD.phone,
  country: countries.BD.name,
};

export type Address = typeof init;

export default function () {
  const [address, updateAddress] = useObjectStore(init);
  const { addNewAddress } = useAddress();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(address).some((v) => v.trim() === "")) {
      return toast.error("All information is not filled!");
    }

    addNewAddress({
      ...address,
      onError(e) {
        console.log(e);
        toast.error("Something went wrong!");
      },
      onSuccess() {
        updateAddress(init);
        toast.success("address added successfully!");
      },
    });
  };

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">Add new Address</h2>

          <div className="mb-4 md:col-span-2">
            <label className="block mb-1"> Street* </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your address"
              value={address.street}
              onChange={(e) => updateAddress({ street: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-3">
            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> City </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Type your city"
                value={address.city}
                onChange={(e) => updateAddress({ city: e.target.value })}
              />
            </div>

            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> State </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Type state here"
                value={address.state}
                onChange={(e) => updateAddress({ state: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-2">
            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> ZIP code </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="number"
                placeholder="Type zip code here"
                value={address.zip}
                onChange={(e) => updateAddress({ zip: e.target.value })}
              />
            </div>

            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> Phone No </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="number"
                placeholder="Type phone no here"
                value={address.phone}
                onChange={(e) => updateAddress({ phone: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4 md:col-span-2">
            <label className="block mb-1"> Country </label>
            <select
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              value={address.country}
              onChange={(e) =>
                updateAddress({
                  country: e.target.value,
                  phone: countriesList.find((c) => e.target.value === c.name)
                    ?.phone,
                })
              }
            >
              {countriesList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}
