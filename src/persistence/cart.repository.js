import cartModel from './models/cart.model.js';

const getCartById = async id => {
  try {
    const cart = await cartModel.findById(id);
    return cart;
  } catch (error) {
    console.error(error);
  }
};

const createCart = async () => {
  try {
    const newCart = await cartModel.create({});
    return newCart;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
const getProductsByIdCart = async cid => {
  try {
    const cart = await cartModel.findById(cid).populate('products.product');
    if (!cart) return null;
    return cart.products;
  } catch (error) {
    console.error('Error:', error);
  }
};

const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

const pushProductInCart = async (cid, pid, quantity) => {
  try {
    const cart = await cartModel.findById(cid);
    const productInCart = cart.products.find(p => p.product == pid);
    if (!productInCart) {
      cart.products.push({ product: pid, quantity: quantity });
    } else {
      productInCart.quantity += quantity;
    }
    cart.save();
    return cart;
  } catch (error) {
    console.error('Error:', error);
  }
};

const deleteProductById = async (cid, pid, quantity = 1) => {
  try {
    const cart = await cartModel.findById(cid);

    const findedProduct = cart.products.find(p => p.product.toString() === pid.toString());

    if (quantity === 1) {
      cart.products.find(p => p.product != pid.toSting());
    } else {
      if (findedProduct.quantity > quantity) {
        findedProduct.quantity -= quantity;
      }
    }
    cart.save();

    return cart;
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateProductsByQuantity = async (cid, pid, newQuery) => {
  try {
    const cart = await cartModel.findById(cid);

    const findedProduct = cart.products.find(p => p.product == pid);

    findedProduct.quantity = newQuery;
    cart.save();
    return cart;
  } catch (error) {
    console.error('Error:', error);
  }
};

const deleteAllProducts = async cid => {
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return { cart: false };
    cart.products = [];
    cart.save();
    return cart;
  } catch (error) {
    console.error(`Error:${error}`);
  }
};

export default {
  getCartById,
  update,
  createCart,
  getProductsByIdCart,
  updateProductsByQuantity,
  pushProductInCart,
  deleteProductById,
  deleteAllProducts,
};
