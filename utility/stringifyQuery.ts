import queryString from "query-string";

function stringifyQuery(query: { [key: string]: string }) {
  return queryString.stringify(
    Object.keys(query)
      .filter((key) => query[key] !== "")
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: query[key] });
      }, {})
  );
}

export default stringifyQuery;
