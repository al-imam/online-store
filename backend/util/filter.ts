function isEmpty(o: object): boolean {
  return Object.keys(o).length === 0;
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

  if (query.search) {
    q.name = { $regex: query.search, $options: "i" };
  }

  console.log(q);

  return q;
}

export default filter;
