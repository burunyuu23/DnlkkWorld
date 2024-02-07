import NextAuth from "../../../../../next-auth-extensions";
import {authOptions} from "../_utils/authConfig";

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};