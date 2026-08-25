import styles from "./ParcelBookingCard.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Price from "@/shared/components/price/Price.tsx";
import Container from "@/shared/components/container/Container.tsx";
import formatDate from "@/shared/utils/formatDate.ts";
import bookingStateLabel from "@/shared/utils/bookingStateLabel.ts";
import { addressToBriefString } from "@/shared/utils/addressToString.ts";
import type { ParcelBookingDto } from "@/shared/types";

type ParcelBookingCardProps = {
    booking: ParcelBookingDto;
};

export default function ParcelBookingCard({ booking }: ParcelBookingCardProps) {
    return (
        <div className={styles.container}>
            <Container gap={2} className={styles.carrier}>
                <Text tag="p" weight="semibold">
                    {booking.carrier?.firstName} {booking.carrier?.lastName}
                </Text>
                <Text tag="span" muted size={0.8}>{bookingStateLabel(booking.state)}</Text>
            </Container>

            <Container gap={2} className={styles.trip}>
                <Text tag="p">{addressToBriefString(booking.trip?.departure)} → {addressToBriefString(booking.trip?.arrival)}</Text>
                <Text tag="span" muted size={0.8}>
                    {formatDate(booking.trip?.departureDate)} - {formatDate(booking.trip?.arrivalDate)}
                </Text>
            </Container>

            <Price totalPrice={booking.price} />
        </div>
    );
}
