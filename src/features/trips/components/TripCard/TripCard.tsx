import styles from "./TripCard.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Divider from "@/shared/components/divider/Divider.tsx";
import { Circle, Euro, MapPin, Route, WeightTilde, Zap } from "lucide-react";
import type { TripSummary } from "@/shared/types";
import formatDate from "@/shared/utils/formatDate.ts";
import formatPrice from "@/shared/utils/formatPrice.ts";
import { addressToBriefString } from "@/shared/utils/addressToString.ts";
import { tripDetailsPath, tripEditPath } from "@/app/routes/paths.ts";
import { tripStateLabel } from "@/features/trips/utils/tripLabels.ts";

type TripProps = {
    trip: TripSummary;
};

export default function TripCard({ trip }: TripProps) {
    const { tripId, departure, arrival, departureDate, arrivalDate, availableWeightKg, remainingWeightKg, pricePerKg, instantBooking, state, stopCount } = trip;
    const stopCountText = stopCount ? `${stopCount} arrêt${stopCount > 1 ? "s" : ""}` : undefined;

    return (
        <div className={styles.container}>
            <div className={styles.status}>
                <Tag icon={<Route size={14} />} value={tripStateLabel(state)} />
            </div>

            <Container gap={12} className={styles.info}>
                <div className={styles.route}>
                    <div className={styles.point}>
                        <Text tag="p" icon={<Circle size={13} />} weight="semibold" className={styles.point_label}>
                            <span className={styles.point_text}>{addressToBriefString(departure)}</span>
                        </Text>
                        <Text tag="span" muted size={0.8}>{formatDate(departureDate)}</Text>
                    </div>

                    <Divider
                        className={`${styles.route_divider} ${styles.route_divider_horizontal}`}
                        text={stopCountText}
                    />
                    <Divider
                        orientation="vertical"
                        className={`${styles.route_divider} ${styles.route_divider_vertical}`}
                        text={stopCountText}
                    />

                    <div className={styles.point}>
                        <Text tag="p" icon={<MapPin size={13} />} weight="semibold" className={styles.point_label}>
                            <span className={styles.point_text}>{addressToBriefString(arrival)}</span>
                        </Text>
                        <Text tag="span" muted size={0.8}>{formatDate(arrivalDate)}</Text>
                    </div>
                </div>

                <Container direction="row" align="center" gap={8} className={styles.details}>
                    <Tag icon={<Euro />} value={`${formatPrice(pricePerKg)}/kg`} />
                    <Tag icon={<WeightTilde />} value={`${remainingWeightKg ?? availableWeightKg} kg dispo`} />
                    {instantBooking && (
                        <Tag icon={<Zap />} value="Instantané" variant="accent" />
                    )}
                </Container>
            </Container>

            <Divider orientation="vertical" className={styles.section_divider} />

            <div className={styles.buttons}>
                <Button to={tripDetailsPath(tripId ?? "")} label="Détails" variant="secondary" className={styles.link} />
                <Button to={tripEditPath(tripId ?? "")} label="Modifier" variant="secondary" className={styles.link} />
            </div>
        </div>
    );
}
