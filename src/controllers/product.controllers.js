import productsServices from '../services/product.services.js';
const getAllProducts = async (req, res) => {
  try {
    const products = await productsServices.getAllProducts(req.params);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsServices.getProductById(pid);
    if (product.product === false) {
      res.status(404).json({ status: 'Error', message: 'El producto no existe' });
    } else {
      res.status(200).json(product);
    }
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productsServices.createProduct(product);
    res.status(201).json({
      status: 'success',
      message: `El producto ${newProduct.title} se agrego`,
    });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await productsServices.updateProduct(pid, product);
    if (updatedProduct.product === false) {
      res.status(404).json({ status: 'not Found', message: 'el producto no existe' });
    }
    res.status(200).json({ updatedProduct });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productsServices.deleteProduct(pid);
    if (deletedProduct.product === null) {
      res.status(404).json({ status: 'not Found', message: deletedProduct.message });
    }
    res.status(200).json({
      status: 'success',
      message: deletedProduct,
    });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};

export default {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
};
