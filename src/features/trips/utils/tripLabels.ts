import type { TripSummary } from "@/shared/types";

const TRIP_STATE_LABELS: Record<NonNullable<TripSummary["state"]>, string> = {
    PUBLISHED: "Publié",
    FULL: "Complet",
    IN_TRANSIT: "En transit",
    COMPLETED: "Terminé",
    CANCELLED: "Annulé",
};

export function tripStateLabel(state?: TripSummary["state"]): string {
    return TRIP_STATE_LABELS[state ?? "PUBLISHED"];
}
