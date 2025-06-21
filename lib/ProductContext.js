import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

export function ProductProvider({ children }) {
  const [otherSlug, setOtherSlug] = useState(null);
  return (
    <ProductContext.Provider value={{ otherSlug, setOtherSlug }}>
      {children}
    </ProductContext.Provider>
  );
}