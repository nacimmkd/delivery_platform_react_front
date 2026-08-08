export const paths = {
    home: "/",
    login: "/login",
    signup: "/signup",
    reset_password: "/reset-password",
    verifyEmail: "/verify-email", 
    parcels: "/parcels",
    trips: "/trips",
    profile: "/profile",
} as const;

export type AppPath = typeof paths[keyof typeof paths];