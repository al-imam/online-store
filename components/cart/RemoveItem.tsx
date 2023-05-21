"use client";

import useCart from "@/store/useCart";

const RemoveItem = ({ id }: { id: string }) => {
  const remove = useCart((store) => store.deleteItem);
  return (
    <button
      onClick={() => remove(id)}
      className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      Remove
    </button>
  );
};

export default RemoveItem;
