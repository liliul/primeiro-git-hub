class Policies {
	userUpdate({ user, resource }) {
		return user.id === resource.id;
	}

	alterarRoles({ user, resource, body }) {
		if (user.id === resource.id) return false;

		if (body.roles?.includes("superadmin")) return false;

		if (user.roles.includes("superadmin")) return true;

		if (user.roles.includes("admin") && resource.roles?.includes("user")) {
			return true;
		}

		return false;
	}

	acessoUser({ user, resource }) {
		if (user.roles.includes("admin")) return true;
		return user.id === resource.id;
	}
}

export default Policies;
