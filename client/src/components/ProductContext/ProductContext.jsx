import { createContext, useContext } from 'react';

const ProductContext = createContext({
    detailsMode : {},
    productsInCart : []
});

export const useProductContext = () => {
  return useContext(ProductContext);
};

export default ProductContext;
