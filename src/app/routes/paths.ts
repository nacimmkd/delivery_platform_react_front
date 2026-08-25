export const paths = {
    home: "/",
    login: "/Login",
    signup: "/Signup",
    verify_email: "/verify-email",
    reset_password: "/reset-password",
    parcels_list: "/parcels",
    parcel_details: "/parcels/details",
    parcel_create: "/parcels/create",
    parcel_edit: "/parcels/:id/edit",
    trips: "/trips",
    trip_details: "/trips/:id",
    trip_create: "/trips/create",
    trip_edit: "/trips/:id/edit",
    profile: "/profile",
    search: "/matching",

} as const;

export type AppPath = typeof paths[keyof typeof paths];

export function parcelEditPath(id: string): string {
    return `/parcels/${id}/edit`;
}

export function tripDetailsPath(id: string): string {
    return `/trips/${id}`;
}

export function tripEditPath(id: string): string {
    return `/trips/${id}/edit`;
}