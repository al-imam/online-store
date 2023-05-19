function isEmpty(o: object): boolean {
  return Object.keys(o).length === 0;
}

function parseNumber(num: string, fallback: number) {
  const n = parseFloat(num);
  if (!isNaN(n)) return n;
  return fallback;
}

interface filterQuery {
  search: string;
  min: string;
  max: string;
  category: string;
  rating: string;
}

function filter(query: Partial<filterQuery>) {
  const q: any = {};
  if (isEmpty(query)) return q;

  if (query.search) q.name = { $regex: query.search, $options: "i" };

  if (query.category) q.category = query.category.toLowerCase();

  console.log(q);

  return q;
}

export default filter;
