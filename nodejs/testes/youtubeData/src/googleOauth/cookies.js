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

const logoutRefreshToken = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",    
}

const logoutAccessToken = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/", 
}

const refreshAccessToken = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000
}

const refreshRefreshToken = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const cookies = {
    accessTokenGoogleOauth,
    refreshTokenGoogleOauth,
    logoutAccessToken,
    logoutRefreshToken,
    refreshAccessToken,
    refreshRefreshToken
}