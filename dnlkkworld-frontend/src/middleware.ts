import middleware from 'next-auth/middleware';

export { middleware };
export const config = {
    matcher: ['/im'],
    pages: {
        signIn: '/login',
    },
};
