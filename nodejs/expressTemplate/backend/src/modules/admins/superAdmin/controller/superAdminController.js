import SuperAdminService from "../service/superAdminService.js";

class SuperAdminController {
	constructor(pool) {
		this.pool = pool;
		this.superAdminService = new SuperAdminService(this.pool);

		this.alterarRole = this.alterarRole.bind(this);
	}

	async alterarRole(req, res, next) {
		try {
			await this.superAdminService.alterarRoleService(req);
			
			return res.status(200).send();
		} catch (error) {
			next(error)
		}
	}
}

export default SuperAdminController;
