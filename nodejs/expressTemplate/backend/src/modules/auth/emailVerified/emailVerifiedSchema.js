import { z } from "zod";

export const emailUserSchema = z.string().email("Email inválido");

export const userIdSchema = z.string().uuid();
