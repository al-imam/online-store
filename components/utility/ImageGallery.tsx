import { Image as ImageType } from "@/types/productInterface";

interface ImageGalleryProps {
  images: ImageType[];
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
        {images.map((image) => (
          <a className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer">
            <img
              className="w-14 h-14"
              src={image.url}
              alt="Product title"
              width="50"
              height="50"
            />
          </a>
        ))}
      </div>
    </aside>
  );
};
