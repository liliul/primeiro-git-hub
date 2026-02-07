import { constsRole } from "../../consts/index.js";

class Policies {
	userUpdate({ user, resource }) {
		return user.id === resource.id;
	}

	alterarRoles({ user, resource, body }) {
		if (user.id === resource.id) return false;

		if (body.roles?.includes(constsRole.ROLES_SUPERADMIN)) return false;

		if (user.roles?.includes(constsRole.ROLES_SUPERADMIN)) return true;

		if (user.roles?.includes(constsRole.ROLES_ADMIN) && resource.roles?.includes(constsRole.ROLES_USER)) {
			return true;
		}

		return false;
	}

	acessoUser({ user, resource }) {
		if (user.roles.includes(constsRole.ROLES_ADMIN)) return true;
		return user.id === resource.id;
	}
}

export default Policies;
