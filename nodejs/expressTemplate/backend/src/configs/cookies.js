export const authCookiesAccessTokenConfig = {
	httpOnly: true,
	secure: false,
	sameSite: "lax",
	path: "/",
	maxAge: 15 * 60 * 1000,
};

export const authCookiesRefreshTokenConfig = {
	httpOnly: true,
	secure: false,
	sameSite: "lax",
	path: "/",
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearCookieConfig = {
	httpOnly: true,
	secure: false,
	sameSite: "lax",
	path: "/",
};
