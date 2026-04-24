class GoogleOauthRepository {
    constructor(pool) {
        this.pool = pool
    }

    async googleOauthTokens({ sub, email, accessToken, refreshToken, expiresAt }) { 

        await this.pool.query(
            `
            INSERT INTO google_oauth_tokens
                (google_id, email, access_token, refresh_token, expires_at)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (google_id)
            DO UPDATE SET
                access_token = EXCLUDED.access_token,
                refresh_token = COALESCE(EXCLUDED.refresh_token, google_oauth_tokens.refresh_token),
                expires_at = EXCLUDED.expires_at,
                updated_at = NOW();
            `,
            [
                sub,
                email,
                accessToken,
                refreshToken,
                expiresAt,
            ]
            );
    }

    async encontrandoGoogleID(sub) {
        const result = await this.pool.query(
            `
            SELECT * FROM google_oauth_tokens WHERE google_id = $1
            `, [sub]
        )

        return result.rows[0] || null;
    }

    async atualizandoToken({newAccessToken, expiresAt, googleId}) {
        await this.pool.query(
            `
            UPDATE google_oauth_tokens
            SET access_token = $1,
                expires_at = $2,
                updated_at = NOW()
            WHERE google_id = $3
            `,
            [newAccessToken, expiresAt, googleId]
        );
    }
}

export default GoogleOauthRepository