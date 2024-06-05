import { useContext } from "react";
import { StoreContext } from "@/app/providers";

export const useStores = () => {
  return useContext(StoreContext);
};