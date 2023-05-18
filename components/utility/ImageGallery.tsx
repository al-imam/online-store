import { Image } from "@/types/productInterface";

interface ImageGalleryProps {
  images: Image[];
}

export default ({ images }: ImageGalleryProps) => {
  return (
    <aside>
      <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
        <img
          className="object-cover inline-block"
          src={images[0] ? images[0].url : "/product.png"}
          alt="Product title"
          width="340"
          height="340"
        />
      </div>
      <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
        <a className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer">
          <img
            className="w-14 h-14"
            src={"/logo192.png"}
            alt="Product title"
            width="500"
            height="500"
          />
        </a>
      </div>
    </aside>
  );
};
