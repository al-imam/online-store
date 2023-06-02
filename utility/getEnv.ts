function getEnv(id: "mongodb_uri" | "jose_secret_key") {
  const value = process.env[id];
  if (value) return value;
  throw new Error(`Env ${id} is not defined!`);
}

export default getEnv;
