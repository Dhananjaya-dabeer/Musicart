import { createContext, useContext } from 'react';

const ProductContext = createContext({
    detailsMode : {},
    productsInCart : [],
    cartAmount: 0
});

export const useProductContext = () => {
  return useContext(ProductContext);
};

export default ProductContext;
