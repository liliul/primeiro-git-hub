import { z } from "zod";
import { constsZod } from "../../../consts/index.js";

export const RoleSchema = z.enum([
	constsZod.ROLES_USER,
	constsZod.ROLES_ADMIN,
	constsZod.ROLES_SUPERADMIN,
]);

export const uuidSchema = z.uuid({
	message: "UUID inválido",
});
