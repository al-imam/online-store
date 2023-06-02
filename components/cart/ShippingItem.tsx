export default function () {
  return (
    <figure className="flex items-center mb-4 leading-5">
      <div>
        <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
          <img width="50" height="50" src="/product.png" alt="Title" />
          <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
            5
          </span>
        </div>
      </div>
      <figcaption className="ml-3">
        <p>Lorem ipsum dolor sit amet consectetur </p>
        <p className="mt-1 text-gray-400">Total: $4354</p>
      </figcaption>
    </figure>
  );
}
