"use client";

import { addItem } from "$store/index";
import ProductInterface from "$types/productInterface";
import { useDispatch } from "react-redux";
import { CartIcon } from "$svg/icons";

interface AddToCartButtonProps {
  product: ProductInterface;
}

function AddToCartButton({
  product: { name, price, images, _id, stock, seller },
}: AddToCartButtonProps) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() =>
        dispatch(
          addItem({
            id: _id,
            imageURL: images[0] ? images[0].url : "/product.png",
            name,
            price,
            quantity: 1,
            seller,
            stock,
          })
        )
      }
      className="flex items-center justify-center gap-2 w-full rounded text-white bg-blue-600 px-4 py-3 text-sm font-medium transition hover:bg-blue-700 cursor-pointer"
    >
      <CartIcon className="text-2xl" />
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
