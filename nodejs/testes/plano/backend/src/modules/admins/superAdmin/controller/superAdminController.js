import SuperAdminService from "../service/superAdminService.js";

class SuperAdminController {
	constructor(pool) {
		this.pool = pool;
		this.superAdminService = new SuperAdminService(this.pool);
	}

	async alterarRole(req, res) {
		await this.superAdminService.alterarRoleService(req);
		return res.status(200).send();
	}
}

export default SuperAdminController;
