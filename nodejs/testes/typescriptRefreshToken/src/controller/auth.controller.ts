import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/db";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../service/token.service";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
    email,
    hashed,
  ]);

  return res.status(201).json({ message: "Usuário criado com sucesso!" });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = result.rows[0];
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Senha incorreta" });

  const accessToken = generateAccessToken({ id: user.id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user.id });

  await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
    refreshToken,
    user.id,
  ]);

  return res.json({ accessToken, refreshToken });
}

export async function refreshToken(req: Request, res: Response) {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Token ausente" });

  try {
    const payload: any = verifyRefreshToken(token);
    const dbRes = await pool.query("SELECT * FROM users WHERE id = $1", [
      payload.id,
    ]);

    const user = dbRes.rows[0];
    if (!user || user.refresh_token !== token)
      return res.status(403).json({ message: "Token inválido" });

    const newAccess = generateAccessToken({ id: user.id, email: user.email });
    const newRefresh = generateRefreshToken({ id: user.id });

    await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      newRefresh,
      user.id,
    ]);

    return res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
}

export async function logout(req: Request, res: Response) {
  const { id } = req.body;
  await pool.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [id]);
  return res.json({ message: "Logout efetuado" });
}
