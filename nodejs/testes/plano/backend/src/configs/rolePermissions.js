import { constsRole } from "../consts/index.js";

export const ROLE_PERMISSIONS = {
	user: [constsRole.PERMISSIONS_USER_UPDATE],

	admin: [constsRole.PERMISSIONS_ADMIN_CREATE, constsRole.PERMISSIONS_ADMIN_UPDATE, constsRole.PERMISSIONS_ADMIN_VIEW],

	superadmin: [constsRole.PERMISSIONS_SUPER_ADMIN],
};
