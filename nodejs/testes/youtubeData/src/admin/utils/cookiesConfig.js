const authAccessToken = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000
}

const authRefreshToken = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 1 * 24 * 60 * 60 * 1000
}

const clearCookieAuthAdmin = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
}

export const cookiesConfig = {
    authAccessToken,
    authRefreshToken,
    clearCookieAuthAdmin
}