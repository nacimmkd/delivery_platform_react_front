import { useState } from "react";
import { useParams } from "react-router-dom";
import { PackageCheck, Route, Ruler, WeightTilde } from "lucide-react";
import styles from "./BookingDetailsPage.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Price from "@/shared/components/price/Price.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Confirmation from "@/shared/components/confirmation/Confirmation.tsx";
import TripItinerary from "@/features/trips/components/TripItinerary/TripItinerary.tsx";
import UserBrief from "@/features/profile/components/UserBrief/UserBrief.tsx";
import useBookingQuery from "@/features/booking/hooks/useBookingQuery.ts";
import useCancelBooking from "@/features/booking/hooks/useCancelBooking.ts";
import bookingStateLabel from "@/shared/utils/bookingStateLabel.ts";
import { bookingPaymentPath } from "@/app/routes/paths.ts";
import type { BookingDto } from "@/shared/types";

function paymentStatusText(state: BookingDto["state"], paid: boolean): string {
    if (state === "COMPLETED") return "Livraison terminée";
    if (paid) return "Payé";
    if (state === "REJECTED") return "Réservation refusée";
    if (state === "CANCELLED") return "Réservation annulée";
    return "En attente de paiement";
}

export default function BookingDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { booking, isLoading, isError } = useBookingQuery(id);
    const { cancelBooking, isLoading: isCancelling } = useCancelBooking();
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    if (isError) {
        return (
            <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
                <Text tag="p" align="center">Réservation introuvable.</Text>
            </Container>
        );
    }

    if (!booking || isLoading) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    const paid = booking.state === "COMPLETED";
    const closed = booking.state === "REJECTED" || booking.state === "CANCELLED" || paid;
    const canPay = !closed;
    const canCancel = !closed;

    async function handleCancel() {
        const success = await cancelBooking(booking?.bookingId ?? "");
        if (success) setIsCancelOpen(false);
    }

    return (
        <div className={styles.page}>
            <div className={styles.layout}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.iconBadge}>
                            <PackageCheck size={26} />
                        </div>
                        <Text tag="h2" weight="bold">Réservation</Text>
                        <Text tag="p" muted>{paymentStatusText(booking.state, paid)}</Text>
                        <Tag icon={<Route size={14} />} value={bookingStateLabel(booking.state)} />
                    </div>

                    <div className={styles.section}>
                        <Text tag="h4" weight="semibold" muted size={0.8}>Colis</Text>
                        <Text tag="p" weight="semibold">{booking.parcel?.title}</Text>
                        <Container direction="row" wrap align="center" gap={8}>
                            <Tag icon={<WeightTilde />} value={`${booking.parcel?.weightKg} kg`} />
                            <Tag icon={<Ruler />} value={booking.parcel?.size ?? ""} />
                            {booking.parcel?.fragile && (
                                <Tag icon={<Ruler />} value="Fragile" variant="accent" />
                            )}
                        </Container>
                    </div>

                    <div className={styles.section}>
                        <Text tag="h4" weight="semibold" muted size={0.8}>Trajet</Text>
                        <TripItinerary
                            departure={booking.trip?.departure}
                            arrival={booking.trip?.arrival}
                            departureDate={booking.trip?.departureDate}
                            arrivalDate={booking.trip?.arrivalDate}
                            stopCount={booking.trip?.stopCount}
                        />
                    </div>

                    <div className={styles.section}>
                        <Text tag="h4" weight="semibold" muted size={0.8}>Livreur</Text>
                        {booking.carrier && <UserBrief user={booking.carrier} />}
                    </div>

                    {canCancel && (
                        <Button
                            label="Annuler la réservation"
                            variant="ghost"
                            fullWidth
                            onClick={() => setIsCancelOpen(true)}
                        />
                    )}
                </div>

                <div className={styles.paymentCard}>
                    <Text tag="h4" weight="semibold" muted size={0.8}>Paiement</Text>
                    <Price totalPrice={booking.price} label="Prix total" />

                    {paid && <Tag value="Payé" />}
                    {canPay && (
                        <Button to={bookingPaymentPath(booking.bookingId ?? "")} label="Payer" variant="main" fullWidth />
                    )}
                </div>
            </div>

            {isCancelOpen && (
                <Confirmation
                    type="delete"
                    title="Annuler cette réservation ?"
                    description="Cette action est irréversible."
                    confirmLabel="Annuler la réservation"
                    cancelLabel="Retour"
                    onConfirm={handleCancel}
                    onClose={() => setIsCancelOpen(false)}
                    isLoading={isCancelling}
                />
            )}
        </div>
    );
}
