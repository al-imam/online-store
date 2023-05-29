import { ReactNode, createContext, useContext } from "react";

const Context = createContext(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  return <Context.Provider value={null}>{children}</Context.Provider>;
}

function useAddress() {
  return useContext(Context);
}

export default useAddress;
