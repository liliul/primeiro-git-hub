class GoogleOauthController {
    constructor(googleOauthService) {
        this.googleOauthService =  googleOauthService

        this.construindoGoogleOauth2 = this.construindoGoogleOauth2.bind(this)
        this.handleGoogleCallback = this.handleGoogleCallback.bind(this)
    }

    construindoGoogleOauth2(req, res) {
      try {
        const googleAuthURL = this.googleOauthService.construaGoogleOauthService()
        
        if(!googleAuthURL) {
            return res.status(401).json({ error: 'Erro no google auth.' })
        }
        
        return res.redirect(googleAuthURL)
      } catch (error) {
        console.error("GOOGLE ERROR: Construindo url auth.", error.response?.data || error.message)
        next(error)
      }
    }

    async handleGoogleCallback(req, res, next) {
       try {
        const code = req.query.code

        const token = await this.googleOauthService.googleCallbackService(code)
        
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 15 * 60 * 1000
        })

        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            
        return res.redirect("/v3/home")
       } catch (error) {
        console.error("GOOGLE ERROR:", error.response?.data || error.message)
        next(error)
       }
    }
}

export default GoogleOauthController