class Policies {
	userUpdate({ user, resource }) {
		return user.id === resource.id;
	}

	alterarRoles({ user, resource }) {
		if (user.id === resource.id) {
			return false;
		}
		return user.roles.includes("admin");
	}

	user({ user, resource }) {
		if (user.roles.includes("admin")) return true;
		return user.id === resource.id;
	}
}

export default Policies;
