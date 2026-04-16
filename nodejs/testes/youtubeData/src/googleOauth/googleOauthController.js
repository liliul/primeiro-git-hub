class GoogleOauthController {
    constructor(googleService) {
        this.googleService =  googleService

        this.google = this.google.bind(this)
        this.googleCallback = this.googleCallback.bind(this)
    }

    google(req, res) {
        const googleAuthURL = this.googleService()
        
        if(!googleAuthURL) {
            return res.status(401).json({ error: 'Erro no google auth.' })
        }
        
        return res.redirect(googleAuthURL)
    }

    async googleCallback(req, res, next) {
       try {
        const code = req.query.code

        const token = await this.googleService.googleCallbackService(code)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,   
            sameSite: "lax",
            path: "/"
        })
        
        return res.redirect("/v3/home")
       } catch (error) {
        console.error("GOOGLE ERROR:", error.response?.data || error.message)
        next(error)
       }
    }
}

export default GoogleOauthController