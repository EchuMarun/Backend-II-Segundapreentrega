import cartServices from '../services/cart.services.js';
import ticketServices from '../services/ticket.services.js';
const createCart = async (req, res) => {
  try {
    const createdCart = await cartServices.createCart();
    res.status(201).json(createdCart);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};

const getProductsByIdCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const findedProducts = await cartServices.getProductsByIdCart(cid);
    if (!findedProducts) {
      res.status(404).json({ status: 'error', message: "this cart id doesn't exist" });
    }
    res.status(200).json(findedProducts);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};
const pushProductInCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;

    const response = await cartServices.pushProductInCart(cid, pid, quantity);
    if (response.cart === false) return res.status(404).json({ status: 'Error', message: 'no existe el carro' });
    if (response.product === false) return res.status(404).json({ status: 'Error', message: 'no existe el producto' });
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'error' });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;

    const response = await cartServices.deleteProductById(cid, pid, quantity);
    if (response.cart === false) return res.status(404).json({ status: 'Error', message: 'no existe el carro' });
    if (response.product === false)
      return res.status(404).json({
        status: 'Error',
        message: 'no existe el producto en el carro',
      });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'error' });
  }
};

const updateProductsByQuantity = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;

    const response = await cartServices.updateProductsByQuantity(cid, pid, quantity);
    if (response.cart === false) return res.status(404).json({ status: 'Error', message: 'no existe el carro' });
    if (response.product === false)
      return res.status(404).json({
        status: 'Error',
        message: 'no existe el producto en el carro',
      });
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'error' });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const findedCart = await cartServices.deleteAllProducts(cid);
    if (findedCart.cart === false) {
      res.status(404).json({ status: 'error', message: "this cart id doesn't exist" });
    }
    res.status(200).json(findedCart);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
};

const purchase = async (req, res) => {
  try {
    console.log('primer control del controller');
    const { cid } = req.params;
    const cart = await cartServices.getCartById(cid);
    console.log('segundo control del controller', cart);
    if (!cart) return res.status(404).json({ status: 'Error', msg: 'cart not found' });
    const total = await cartServices.calculateTotal(cid);
    console.log('tercer control del controller', total);
    const ticket = await ticketServices.createTicket(req.user.email, total);
    console.log('cuarto control del controller con su ticket', ticket);
    return res.status(200).json({ status: 'success', payload: ticket });
  } catch (error) {}
};

export default {
  createCart,
  getProductsByIdCart,
  pushProductInCart,
  deleteProductById,
  updateProductsByQuantity,
  deleteAllProducts,
  purchase,
};
