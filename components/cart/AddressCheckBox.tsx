import AddressInterface from "@/types/AddressInterface";
import Prettify from "@/types/Prettify";

interface AddressCheckBoxProps {
  address: Prettify<AddressInterface & { _id: string }>;
  setId: (id: string) => void;
  id: string;
}

export default function ({ address, setId, id }: AddressCheckBoxProps) {
  return (
    <label
      onChange={() => setId(address._id)}
      className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
    >
      <span>
        <input
          checked={id === address._id}
          name="shipping"
          type="radio"
          className="h-4 w-4 mt-1"
        />
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
