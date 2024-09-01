import { productModel } from './models/product.model.js';

const getAllProducts = async (query, filter) => {
  try {
    const products = await productModel.paginate(query, filter);
    return products;
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async id => {
  try {
    const product = await productModel.findById(id);
    if (!product) return { product: false };
    return product;
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async product => {
  try {
    const newProduct = await productModel.create(product);
    return newProduct;
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (id, updates) => {
  try {
    const product = await productModel.findById(id);
    if (!product) return { product: false };
    const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async id => {
  try {
    const product = await productModel.findById(id);
    if (!product) return { product: null, message: `el producto ${id} no se encontro` };
    await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return `el producto ${id} se elimino correctamente`;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
