function isEmpty(o: object): boolean {
  return Object.keys(o).length === 0;
}

function filter(
  query: Partial<{
    search: string;
    min: string;
    max: string;
    category: string;
    rating: string;
  }>
) {
  if (isEmpty(query)) return {};
}

export default filter;
