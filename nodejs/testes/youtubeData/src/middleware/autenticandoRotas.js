import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function authRequirida(req, res, next) {
  const token = req.cookies.token;

  if (!token){
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "my-video-you",
      audience: "my-video-you-web",
    });

    req.user = {
      googleId: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

export default authRequirida;
