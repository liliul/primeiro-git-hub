class SuperAdminRepository {
	async updateRole(client, id, roles) {
		return client.query(`UPDATE users SET roles = $1 WHERE id = $2`, [
			roles,
			id,
		]);
	}
}

export default SuperAdminRepository;
