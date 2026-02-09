import { ROLE_PERMISSIONS } from "../configs/rolePermissions.js";

export function resolvePermissionsJwt(roles) {
	const roleList = Array.isArray(roles) ? roles : [roles];

	const permissions = new Set();

	for (const role of roleList) {
		const perms = ROLE_PERMISSIONS[role] || [];
		perms.forEach((p) => permissions.add(p));
	}

	return Array.from(permissions);
}
