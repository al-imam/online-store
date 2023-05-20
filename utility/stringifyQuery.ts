function stringifyQuery(query: { [key: string]: string }) {
  const noEmptyQuery: { [key: string]: string } = {};

  for (const key in query) {
    if (query[key] !== "") {
      noEmptyQuery[key] = query[key];
    }
  }

  const qp = new URLSearchParams(noEmptyQuery);

  return qp.toString();
}

export default stringifyQuery;
