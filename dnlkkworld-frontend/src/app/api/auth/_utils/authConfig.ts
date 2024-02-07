import {Account, Session, User} from "next-auth";
import {Provider} from "next-auth/providers";
import KeycloakProvider from "next-auth/providers/keycloak";
import {refreshAccessToken} from "./refreshAccessToken";
import {JWT} from "next-auth/jwt";
import {env} from "process";

const keycloakProvider = KeycloakProvider({
    clientId: env.KEYCLOAK_CLIENT_ID,
    clientSecret: env.KEYCLOAK_CLIENT_SECRET,
    issuer: env.KEYCLOAK_ISSUER,
    authorization: {
        params: {
            grant_type: 'authorization_code',
            scope:
                'openid tts-saas-user-attribute email speech-api profile console-prosa payment-service',
            response_type: 'code'
        }
    },
    httpOptions: {
        timeout: 30000
    }
})

const providers: Provider[] = [
    keycloakProvider,
];

export const authOptions  = {
    secret: env.NEXTAUTH_SECRET,
    providers,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn(user: User, account: Account) {
            if (account && user) {
                return true;
            } else {
                // TODO : Add unauthorized page
                return '/unauthorized';
            }
        },
        async redirect(url: string, baseUrl: string) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async session(session: Session, token: JWT) {
            if (token) {
                session.user = token.user;
                session.error = token.error;
                session.accessToken = token.accessToken;
            }
            return session;
        },
        async jwt(token: JWT, user: User, account: Account) {
            // Initial sign in
            if (account && user) {
                // Add access_token, refresh_token and expirations to the token right after signin
                token.accessToken = account.accessToken;
                token.refreshToken = account.refreshToken;
                token.accessTokenExpired =
                    Date.now() + (account.expires_in - 15) * 1000;
                token.refreshTokenExpired =
                    Date.now() + (account.refresh_expires_in - 15) * 1000;
                token.user = user;
                return token;
            }

            if (Date.now() < token.accessTokenExpired) return token;
            return refreshAccessToken(token);
        },
    },
};