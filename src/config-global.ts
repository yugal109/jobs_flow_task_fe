import { paths } from "./routes/path";

export const PATH_AFTER_SIGN_IN = paths.base.home;
export const PATH_SIGN_IN = paths.auth.signIn;
export const PATH_SIGN_UP = paths.auth.signUp;
export const ALLOWED_PATHS = [PATH_SIGN_IN, PATH_SIGN_UP];
