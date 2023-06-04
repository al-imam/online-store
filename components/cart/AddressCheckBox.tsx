import AddressInterface from "@/types/AddressInterface";

export default function ({ address }: { address: AddressInterface }) {
  return (
    <label className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
      <span>
        <input name="shipping" type="radio" className="h-4 w-4 mt-1" />
      </span>
      <p className="ml-2">
        <span>{address.street}</span>
        <small className="block text-sm text-gray-400">
          {address.city}, {address.state}, {address.zip}
          <br />
          {address.country}
          <br />
          {address.phone}
        </small>
      </p>
    </label>
  );
}
