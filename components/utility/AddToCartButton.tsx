"use client";

import useCart from "@/store/useCart";
import ServerResponse from "@/types/productInterface";

interface AddToCartButtonProps {
  product: ServerResponse;
}

function AddToCartButton({
  product: { name, price, images, _id, stock, seller },
}: AddToCartButtonProps) {
  const addItem = useCart((store) => store.addItem);

  return (
    <button
      onClick={() =>
        addItem({
          id: _id,
          imageURL: images[0] ? images[0].url : "/product.png",
          name,
          price,
          quantity: 1,
          seller,
          stock,
        })
      }
      className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
    >
      {/* <i className="fa fa-shopping-cart mr-2"></i> */}
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
