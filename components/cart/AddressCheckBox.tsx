export default function () {
  return (
    <label className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
      <span>
        <input name="shipping" type="radio" className="h-4 w-4 mt-1" />
      </span>
      <p className="ml-2">
        <span>street</span>
        <small className="block text-sm text-gray-400">
          city, state, zip
          <br />
          country
          <br />
          phoneNo
        </small>
      </p>
    </label>
  );
}
