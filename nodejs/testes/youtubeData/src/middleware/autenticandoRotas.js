function authRequirida(req, res, next) {
  if (!req.cookies.token) {
    return res.redirect("/");
  }
  next();
}

export default authRequirida;