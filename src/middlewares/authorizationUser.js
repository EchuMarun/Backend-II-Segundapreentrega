export const authUser = role => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ status: 'Error', message: 'Unauthorized' });
    if (req.user.role != role) return res.status(403).json({ status: 'Error', message: 'no permission' });
    next();
  };
};
