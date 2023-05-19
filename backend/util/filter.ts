function filter(
  query: Partial<{
    search: string;
    min: string;
    max: string;
    category: string;
    rating: string;
  }>
) {
  console.log(query);
}

export default filter;
