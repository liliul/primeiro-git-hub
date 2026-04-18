class GoogleOauthController {
    constructor(googleOauthService) {
        this.googleOauthService =  googleOauthService

        this.construindoGoogleOauth2 = this.construindoGoogleOauth2.bind(this)
        this.handleGoogleCallback = this.handleGoogleCallback.bind(this)
    }

    construindoGoogleOauth2(req, res) {
        const googleAuthURL = this.googleOauthService.construaGoogleOauthService()
        
        if(!googleAuthURL) {
            return res.status(401).json({ error: 'Erro no google auth.' })
        }
        
        return res.redirect(googleAuthURL)
    }

    async handleGoogleCallback(req, res, next) {
       try {
        const code = req.query.code

        const token = await this.googleOauthService.googleCallbackService(code)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
            
        return res.redirect("/v3/home")
       } catch (error) {
        console.error("GOOGLE ERROR:", error.response?.data || error.message)
        next(error)
       }
    }
}

export default GoogleOauthController