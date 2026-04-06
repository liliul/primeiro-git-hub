import argon2 from "argon2";

class IsPasswordArgon2 {
	constructor() {
		this.PEPPER = process.env.PASSWORD_PEPPER;

		if (!this.PEPPER) {
			throw new Error("PASSWORD_PEPPER pode estar ausente na .env");
		}
	}

	async hashPassword(password) {
		return argon2.hash(password, {
			type: argon2.argon2id,
			memoryCost: 2 ** 16,
			timeCost: 3,
			parallelism: 1,
			secret: Buffer.from(this.PEPPER, "utf-8"),
		});
	}

	async verifyPassword(password, hash) {
		return argon2.verify(hash, password, {
			secret: Buffer.from(this.PEPPER, "utf-8"),
		});
	}
}

export default IsPasswordArgon2;
