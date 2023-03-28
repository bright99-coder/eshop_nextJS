import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import swal from "sweetalert";

type CompareContextProps = {
  children: ReactNode;
};

type CompareContext = {
  compareItems: Product[];
  setCompareItems: React.Dispatch<React.SetStateAction<Product[]>>;
  addCompare: (product: Product) => void;
  removeCompare: (id: number | string) => void;
};

const CompareContext = createContext({} as CompareContext);

export function useCompare() {
  return useContext(CompareContext);
}
export function CompareProvider({ children }: CompareContextProps) {
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const addCompare = (product: Product) => {
    if (compareItems.length <= 2) {
      setCompareItems((compareList) => [...compareList, product]);
    } else {
      swal("Warning", "Maximum 3 Product To Compare", "warning");
    }
  };

  function removeCompare(id: number | string) {
    setCompareItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        setCompareItems,
        addCompare,
        removeCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
