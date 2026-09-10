const accessTokenGoogleOauth = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000
}

const refreshTokenGoogleOauth =  {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const cookies = {
    accessTokenGoogleOauth,
    refreshTokenGoogleOauth
}