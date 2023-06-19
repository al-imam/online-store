import { QueryInterface } from "$types/queryInterface";
import capitalize from "$utility/capitalize";
import categories from "$utility/categories";
import escapeStringRegexp from "escape-string-regexp";
import parseNumber from "$backend/util/parseNumber";

function isEmpty(o: object): boolean {
  return Object.keys(o).length === 0;
}

interface QUERY {
  name: { $regex: string; $options: "i" };
  category: string;
  price: Partial<{ $gte: number; $lte: number }>;
  rating: { $gte: number };
  stock: { $gte: number } | number;
}

function filter(query: Partial<QueryInterface>) {
  const q: Partial<QUERY> = {};

  if (isEmpty(query)) return q;

  if (query.search) {
    q.name = { $regex: escapeStringRegexp(query.search), $options: "i" };
  }

  if (query.availability) {
    if (query.availability === "unavailable") q.stock = 0;
    if (query.availability === "available") q.stock = { $gte: 1 };
  }

  if (query.category) {
    if (categories.includes(capitalize(query.category))) {
      q.category = query.category.toLowerCase();
    }
  }

  if (query.min || query.max) {
    q.price = {};
    if (query.min) q.price.$gte = parseNumber(query.min, 0);
    if (query.max) q.price.$lte = parseNumber(query.max, Infinity);
  }

  if (query.rating) q.rating = { $gte: parseNumber(query.rating, 0) };

  return q;
}

export default filter;
