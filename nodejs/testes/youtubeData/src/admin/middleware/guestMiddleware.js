export const guestMiddleware = (tokenService) => {
    return (req, res, next) => {

        const accessToken = req.cookies.authAccessToken;

        if (!accessToken) {
            return next()
        }

        try {
            tokenService.verify(accessToken)

            return res.redirect("/admin")

        } catch {
            return next()
        }
    }
}