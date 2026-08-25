import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Route } from "lucide-react";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Button from "@/shared/components/button/Button.tsx";
import TripOverview from "@/features/trips/components/TripOverview/TripOverview.tsx";
import TripItinerary from "@/features/trips/components/TripItinerary/TripItinerary.tsx";
import TripBookingCard from "@/features/trips/components/TripBookingCard/TripBookingCard.tsx";
import Confirmation from "@/shared/components/confirmation/Confirmation.tsx";
import useTripQuery from "@/features/trips/hooks/useTripQuery.ts";
import useTripBookingsQuery from "@/features/trips/hooks/useTripBookingsQuery.ts";
import useDeleteTrip from "@/features/trips/hooks/useDeleteTrip.ts";
import { tripStateLabel } from "@/features/trips/utils/tripLabels.ts";
import { paths, tripEditPath } from "@/app/routes/paths.ts";

export default function TripDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { trip, isError } = useTripQuery(id);
    const { bookings } = useTripBookingsQuery(id);
    const { deleteTrip, isLoading: isDeleting } = useDeleteTrip();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    if (isError) {
        return (
            <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
                <Text tag="p" align="center">Trajet introuvable.</Text>
            </Container>
        );
    }

    if (!trip) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    const actionStyle = { height: 42, minWidth: 120, boxSizing: "border-box" } as const;

    async function handleConfirmDelete() {
        const success = await deleteTrip(trip.tripId ?? "");
        if (success) navigate(paths.trips);
    }

    return (
        <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
            <Container direction="row" align="center" justify="space-between" gap={20}>
                <Container direction="row" align="center" gap={14}>
                    <Text tag="h1" weight="bold" size={2}>
                        {trip.departureAddress?.city} → {trip.arrivalAddress?.city}
                    </Text>
                    <Tag icon={<Route size={14} />} value={tripStateLabel(trip.state)} />
                </Container>

                <Container direction="row" align="center" gap={10}>
                    <Button to={tripEditPath(trip.tripId ?? "")} label="Modifier" variant="secondary" size="md" style={actionStyle} />
                    <Button
                        label="Supprimer"
                        variant="danger"
                        size="md"
                        style={actionStyle}
                        onClick={() => setIsConfirmOpen(true)}
                    />
                </Container>
            </Container>

            <Container direction="row" wrap gap={24}>
                <Container style={{ flex: "1 1 380px", minWidth: 0 }}>
                    <TripOverview
                        pricePerKg={trip.pricePerKg}
                        availableWeightKg={trip.availableWeightKg}
                        remainingWeightKg={trip.remainingWeightKg}
                        maxDetourKm={trip.maxDetourKm}
                        instantBooking={trip.instantBooking}
                        notes={trip.notes}
                    />
                </Container>
                <Container style={{ flex: "1 1 380px", minWidth: 0 }}>
                    <TripItinerary departure={trip.departureAddress} stops={trip.stops ?? []} arrival={trip.arrivalAddress} />
                </Container>
            </Container>

            <Container gap={16}>
                <Text tag="h3" weight="bold">Réservations</Text>

                {bookings.length === 0 && (
                    <Text tag="p" muted>Aucune réservation pour le moment.</Text>
                )}

                {bookings.length > 0 && (
                    <Container gap={12}>
                        {bookings.map((booking) => (
                            <TripBookingCard key={booking.bookingId} booking={booking} />
                        ))}
                    </Container>
                )}
            </Container>

            {isConfirmOpen && (
                <Confirmation
                    type="delete"
                    title="Supprimer ce trajet ?"
                    description="Cette action est irréversible. Le trajet sera définitivement supprimé."
                    onConfirm={handleConfirmDelete}
                    onClose={() => setIsConfirmOpen(false)}
                    isLoading={isDeleting}
                />
            )}
        </Container>
    );
}
