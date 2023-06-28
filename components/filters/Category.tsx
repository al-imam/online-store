"use client";

import capitalize from "$utility/capitalize";
import categories from "$utility/categories";
import { useRouter } from "next/navigation";
import { useEffect, useId } from "react";
import useObjectStore from "use-object-store";

export function Category() {
  const router = useRouter();
  const [store, updateStore] = useObjectStore({
    category: null as string | null,
  });

  function changeQuery(select: string) {
    const qp = new URLSearchParams(window.location.search);

    if (select === store.category) {
      updateStore({ category: null });
      qp.delete("category");
    } else {
      updateStore({ category: select });
      qp.set("category", select.toLowerCase());
    }

    qp.delete("page");
    qp.set("page", "1");

    router.push(`/?${qp.toString()}`);
  }

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    const ct = qp.get("category");
    if (ct && categories.includes(capitalize(ct))) {
      updateStore({ category: ct });
    }
  }, []);

  return (
    <div className="border-t border-gray-200">
      <header className="flex items-center justify-between p-4">
        <span className="text-sm text-gray-700">
          {store.category ?? "Not selected"}
        </span>

        <button
          type="button"
          className="text-sm text-gray-900 underline underline-offset-4"
          onClick={() => store.category && changeQuery(store.category)}
        >
          Reset
        </button>
      </header>

      <ul className="space-y-1 border-t border-gray-200 p-4">
        {categories.map((category) => (
          <Item
            key={category}
            category={category}
            selected={store.category}
            changeQuery={changeQuery}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({
  category,
  selected,
  changeQuery,
}: {
  category: string;
  selected: null | string;
  changeQuery: (select: string) => void;
}) {
  const id = useId();

  useEffect(() => {});

  return (
    <li>
      <label htmlFor={id} className="inline-flex items-center gap-2">
        <input
          type="radio"
          value={category.toLowerCase()}
          name="category"
          id={id}
          checked={selected === category.toLowerCase()}
          onChange={(e) => changeQuery(e.target.value)}
          className="h-5 w-5 rounded border-gray-300 form-radio"
        />

        <span className="text-sm font-medium text-gray-700 select-none">
          {category}
        </span>
      </label>
    </li>
  );
}
