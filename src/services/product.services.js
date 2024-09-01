import productDao from '../persistence/product.repository.js';
import { resProductDTO, resAllProductsDTO } from '../dto/product.dto.js';

const getAllProducts = async queries => {
  try {
    const { page, limit, sort, category } = queries;
    const filter = {
      page: page || 1,
      limit: limit || 10,
      sort: {
        price: sort === 'asc' ? 1 : -1,
      },
      category: category ? category : null,
    };
    const query = { status: true };
    const products = await productDao.getAllProducts(query, filter);
    const productsDTO = resAllProductsDTO(products);
    return productsDTO;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductById = async pid => {
  try {
    const product = await productDao.getProductById(pid);
    const productDTO = resProductDTO(product);
    return productDTO;
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async product => {
  try {
    return await productDao.createProduct(product);
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (pid, product) => {
  try {
    return await productDao.updateProduct(pid, product);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async pid => {
  try {
    return await productDao.deleteProduct(pid);
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
