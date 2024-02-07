declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_URL: string;
            NEXT_MESSAGE_API_URL: string;
            NODE_ENV: 'development' | 'production';
            NEXTAUTH_SECRET: string;
            KEYCLOAK_CLIENT_ID: string;
            KEYCLOAK_CLIENT_SECRET: string;
            KEYCLOAK_ISSUER: string;
        }
    }
}
export {}