import cartRepository from '../persistence/cart.repository.js';
import productRepository from '../persistence/product.repository.js';
import productDao from '../persistence/product.repository.js';
const createCart = async () => {
  try {
    return await cartRepository.createCart();
  } catch (error) {
    throw Error(error);
  }
};

const getCartById = async id => {
  try {
    return await cartRepository.getCartById(id);
  } catch (error) {
    throw Error(error);
  }
};

const getProductsByIdCart = async cid => {
  try {
    return await cartRepository.getProductsByIdCart(cid);
  } catch (error) {
    throw Error(error);
  }
};
const pushProductInCart = async (cid, pid, quantity = 1) => {
  try {
    return await cartRepository.pushProductInCart(cid, pid, Number(quantity));
  } catch (error) {
    throw Error(error);
  }
};

const deleteProductById = async (cid, pid, quantity = 1) => {
  try {
    return await cartRepository.deleteProductById(cid, pid, Number(quantity));
  } catch (error) {
    throw Error(error);
  }
};

const updateProductsByQuantity = async (cid, pid, quantity = 1) => {
  try {
    return await cartRepository.updateProductsByQuantity(cid, pid, Number(quantity));
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAllProducts = async cid => {
  try {
    return await cartRepository.deleteAllProducts(cid);
  } catch (error) {
    throw new Error(error);
  }
};

const checkProdAndCart = async (cid, pid) => {
  try {
    const productExist = await productDao.getProductById(pid);
    const cartExist = await cartRepository.getCartById(cid);
    return {
      productExist: productExist || null,
      cartExist: cartExist || null,
    };
  } catch (error) {
    throw Error(error);
  }
};

const calculateTotal = async id => {
  try {
    console.log('primer control del service');
    const cart = await cartRepository.getCartById(id);
    console.log('segundo control del service', cart);
    let total = 0;
    const prodWithOutStock = [];
    for (const prod of cart.products) {
      const findedProduct = await productRepository.getProductById(prod.product);
      console.log('tercer control del service', findedProduct);
      if (findedProduct.stock >= prod.quantity) {
        total += findedProduct.price * prod.quantity;
        await productRepository.updateProduct(findedProduct._id, { stock: findedProduct.stock - prod.quantity });
      } else {
        prodWithOutStock.push(prod);
      }
    }
    console.log('cuarto control del service');

    await cartRepository.update(id, { products: prodWithOutStock });

    console.log('quinto control del service');

    return total;
  } catch (error) {
    throw Error(error);
  }
};

export default {
  createCart,
  getCartById,
  getProductsByIdCart,
  pushProductInCart,
  deleteProductById,
  updateProductsByQuantity,
  deleteAllProducts,
  checkProdAndCart,
  calculateTotal,
};
