import styles from "./TripBookingCard.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Price from "@/shared/components/price/Price.tsx";
import Container from "@/shared/components/container/Container.tsx";
import bookingStateLabel from "@/shared/utils/bookingStateLabel.ts";
import type { TripBookingDto } from "@/shared/types";

type TripBookingCardProps = {
    booking: TripBookingDto;
};

export default function TripBookingCard({ booking }: TripBookingCardProps) {
    return (
        <div className={styles.container}>
            <Container gap={2} className={styles.sender}>
                <Text tag="p" weight="semibold">
                    {booking.sender?.firstName} {booking.sender?.lastName}
                </Text>
                <Text tag="span" muted size={0.8}>{bookingStateLabel(booking.state)}</Text>
            </Container>

            <Container gap={2} className={styles.parcel}>
                <Text tag="p">{booking.parcel?.title}</Text>
                <Text tag="span" muted size={0.8}>{booking.parcel?.weightKg} kg</Text>
            </Container>

            <Price totalPrice={booking.price} />
        </div>
    );
}
