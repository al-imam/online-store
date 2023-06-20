import Availability from "$components/filters/Availability";
import Category from "$components/filters/Category";
import Price from "$components/filters/Price";
import Sort from "$components/filters/Sort";

export { Availability, Category, Price, Sort };

export default function () {
  return (
    <div className="hidden lg:block lg:h-[calc(100vh-calc(var(--nav-size)+3rem))] overflow-y-scroll remove-scroll-bar pb-4">
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
