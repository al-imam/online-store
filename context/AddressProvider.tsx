import { ReactNode, createContext, useContext } from "react";
import { Address } from "@/components/user/NewAddress";
import { Post } from "@/utility/request";

interface AddressInterface {
  addNewAddress: (
    object: Address & {
      onError?: (e: any) => void;
      onSuccess?: () => void;
    }
  ) => Promise<void>;
}

const Context = createContext<AddressInterface | null>(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  async function addNewAddress({
    onError = () => {},
    onSuccess = () => {},
    ...address
  }: Address & {
    onError?: (e: any) => void;
    onSuccess?: () => void;
  }) {
    try {
      await Post("address", address);
      onSuccess();
    } catch (e) {
      onError(e);
    }
  }

  return (
    <Context.Provider value={{ addNewAddress }}>{children}</Context.Provider>
  );
}

function useAddress() {
  return useContext(Context);
}

export default useAddress;
