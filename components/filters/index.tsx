import Availability from "$components/filters/Availability";
import Category from "$components/filters/Category";
import Price from "$components/filters/Price";
import Sort from "$components/filters/Sort";

export { Availability, Category, Price, Sort };

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
