import { z } from "zod"

const RoleEnum = z.enum(["user", "admin"])

export const roleSchema = z.object({
  role: RoleEnum
})

export const userIdParamSchema = z.object({
  id: z.string().uuid({ message: "ID inválido, deve ser um UUID" })
});