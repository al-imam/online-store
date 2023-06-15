import Availability from "./Availability";
import Category from "./Category";
import Price from "./Price";
import Sort from "./Sort";

export { Availability, Price, Sort, Category };

export default function () {
  return (
    <div className="hidden lg:block">
      <div>
        <p className="block text-xs font-medium text-gray-700">Filters</p>

        <div className="mt-1 space-y-2">
          <Availability />
          <Price />
          <Category />
        </div>
      </div>
    </div>
  );
}
