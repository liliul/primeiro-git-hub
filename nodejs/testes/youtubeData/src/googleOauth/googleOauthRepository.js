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

     async bucarGoogleIdBySub(sub) {
        const result = await this.pool.query(
            `
            SELECT * FROM google_users WHERE sub = $1
            `, [sub]
        )

        return result.rows[0] || null;
    }

    async atualizandoRefreshToken({refreshToken, expiresAt, googleId}) {
        await this.pool.query(
            `
            INSERT INTO refresh_tokens (
                google_id,
                token,
                expires_at
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (google_id)
            DO UPDATE SET
                token = EXCLUDED.token,
                expires_at = EXCLUDED.expires_at;
            `,
            [googleId, refreshToken, expiresAt]
        );
    }

    async buscandoRefreshTokenByToken(refreshToken) {
        const result = await this.pool.query(
            `
            SELECT * FROM refresh_tokens WHERE token = $1
            `,
            [refreshToken]
        );

        return result.rows[0] || null;
    }

    async criarGoogleUsers({sub, email, email_verified, name, given_name, family_name, picture, iss, azp, aud, at_hash, iat, exp}) {
        const result = await this.pool.query(
            `
            INSERT INTO google_users (
                sub,
                email,
                email_verified,
                name,
                given_name,
                family_name,
                picture,
                iss,
                azp,
                aud,
                at_hash,
                iat,
                exp
            )
            VALUES (
                $1, $2, $3, $4, $5, $6,
                $7, $8, $9, $10, $11, $12, $13
            )
            ON CONFLICT (sub)
            DO UPDATE SET
                email = EXCLUDED.email,
                email_verified = EXCLUDED.email_verified,
                name = EXCLUDED.name,
                given_name = EXCLUDED.given_name,
                family_name = EXCLUDED.family_name,
                picture = EXCLUDED.picture,
                iss = EXCLUDED.iss,
                azp = EXCLUDED.azp,
                aud = EXCLUDED.aud,
                at_hash = EXCLUDED.at_hash,
                iat = EXCLUDED.iat,
                exp = EXCLUDED.exp
            RETURNING *;
            `,
            [sub, email, email_verified, name, given_name, family_name, picture, iss, azp, aud, at_hash, iat, exp]
        )

        return result.rows[0] || null;
    }

    async deletarRefreshTokenById(id) {
		await this.pool.query(`DELETE FROM refresh_tokens WHERE id = $1`, [id]);
	}
}

export default GoogleOauthRepository