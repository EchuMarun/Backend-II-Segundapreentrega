export const resProductDTO = product => {
  return {
    title: product.title,
    description: product.description,
    stock: product.stock,
    price: product.price,
  };
};

export const resAllProductsDTO = ({ docs, ...product }) => {
  let resProductDTO = [];
  for (let prod in docs) {
    const productDTO = {
      title: docs[prod].title,
      description: docs[prod].description,
      stock: docs[prod].stock,
      price: docs[prod].price,
    };
    resProductDTO.push(productDTO);
  }
  return {
    docs: resProductDTO,
    ...product,
  };
};
