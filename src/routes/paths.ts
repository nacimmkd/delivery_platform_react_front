export const paths = {
    home: "/",
    login: "/login",
    signup: "/signup",
    reset_password: "/reset-password",
    parcels: "/parcels",
    trips: "/trips",
    profile: "/profile",
} as const;

export type AppPath = typeof paths[keyof typeof paths];