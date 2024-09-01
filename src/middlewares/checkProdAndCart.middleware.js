import cartServices from '../services/cart.services.js';
export const checkProdAndCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.body;
    const existProdAndCart = await cartServices.checkProdAndCart(cid, pid);
    if (!existProdAndCart.productExist && !existProdAndCart.cartExist) {
      res.status(404).json({
        status: 'Error',
        message: 'cart or product doesnt exist',
      });
    }
    next();
  } catch (error) {
    throw error;
  }
};
