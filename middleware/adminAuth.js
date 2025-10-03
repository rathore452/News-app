// middleware/adminAuth.js
const ADMIN_KEY = "my-secret-admin-key"; // ye same key frontend me use hoga

const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || auth !== `Basic ${ADMIN_KEY}`) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export default adminAuth;
