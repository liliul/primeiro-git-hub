module.exports = {
    secret: process.env.JWT_SECRET || 'fallback_secret_if_not_set_in_env_but_dont_do_this_in_prod',
    expiresIn: '1h' // Token expira em 1 hora
};