import { z } from "zod";
import { constsRole } from "../../../consts/index.js";

export const RoleSchema = z.enum([
	constsRole.ROLES_USER,
	constsRole.ROLES_ADMIN,
	constsRole.ROLES_SUPERADMIN,
]);

export const uuidSchema = z.uuid({
	message: "UUID inválido",
});
