export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "Forbidden" });

  const token = authHeader.split(" ")[1];
  if (token !== "mysecrettoken") { // simple token check
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
