import {useState} from "react";
import { ChevronDown, Circle, MapPin } from "lucide-react";
import styles from "./TripItinerary.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Divider from "@/shared/components/divider/Divider.tsx";
import { addressToBriefString } from "@/shared/utils/addressToString.ts";
import formatDate from "@/shared/utils/formatDate.ts";
import type { Address, TripStopDto } from "@/shared/types";

function stopCountText(count: number): string | undefined {
    return count > 0 ? `${count} arrêt${count > 1 ? "s" : ""}` : undefined;
}

type DetailedTripItineraryProps = {
    departure?: Address;
    arrival?: Address;
    stops: TripStopDto[];
    stopCount?: never;
};

type BriefTripItineraryProps = {
    departure?: Address;
    arrival?: Address;
    departureDate?: string;
    arrivalDate?: string;
    stopCount?: number;
    stops?: never;
};

type TripItineraryProps = DetailedTripItineraryProps | BriefTripItineraryProps;

function DetailedItinerary({ departure, arrival, stops }: DetailedTripItineraryProps) {
    const [showDetails, setShowDetails] = useState(false);
    const orderedStops = [...stops].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const hasStops = orderedStops.length > 0;
    const countText = stopCountText(orderedStops.length);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Text tag="h3" weight="bold">Itinéraire</Text>
                {hasStops && (
                    <Button
                        label={showDetails ? "Voir moins" : "Voir les étapes"}
                        variant="ghost"
                        size="sm"
                        icon={<ChevronDown size={16} className={showDetails ? styles.chevronOpen : styles.chevron} />}
                        iconPosition="right"
                        onClick={() => setShowDetails((prev) => !prev)}
                    />
                )}
            </div>

            <ul className={styles.steps}>
                <li className={styles.step}>
                    <Circle size={13} />
                    <span className={styles.step_text}>{addressToBriefString(departure)}</span>
                </li>
                {showDetails
                    ? orderedStops.map((stop) => (
                        <li key={stop.id} className={styles.step}>
                            <MapPin size={13} />
                            <span className={styles.step_text}>{addressToBriefString(stop.address)}</span>
                        </li>
                    ))
                    : countText && (
                        <li className={`${styles.step} ${styles.stopsCount}`}>
                            <MapPin size={13} />
                            <span className={styles.step_text}>{countText}</span>
                        </li>
                    )}
                <li className={styles.step}>
                    <MapPin size={13} />
                    <span className={styles.step_text}>{addressToBriefString(arrival)}</span>
                </li>
            </ul>
        </div>
    );
}

function BriefItinerary({ departure, arrival, departureDate, arrivalDate, stopCount }: BriefTripItineraryProps) {
    const countText = stopCount ? stopCountText(stopCount) : undefined;

    return (
        <div className={styles.briefRoute}>
            <div className={styles.briefPoint}>
                <Text tag="span" muted className={styles.briefLabel}>Départ</Text>
                <Text tag="p" weight="semibold" className={styles.briefAddress}>
                    {departure?.city}
                </Text>
                <Text tag="span" muted className={styles.briefCountry}>{departure?.country}</Text>
                {departureDate && (
                    <Text tag="span" muted className={styles.briefDate}>{formatDate(departureDate)}</Text>
                )}
            </div>

            <Divider className={styles.briefDivider} text={countText} />

            <div className={`${styles.briefPoint} ${styles.briefPointRight}`}>
                <Text tag="span" muted className={styles.briefLabel}>Arrivée</Text>
                <Text tag="p" weight="semibold" className={styles.briefAddress}>
                    {arrival?.city}
                </Text>
                <Text tag="span" muted className={styles.briefCountry}>{arrival?.country}</Text>
                {arrivalDate && (
                    <Text tag="span" muted className={styles.briefDate}>{formatDate(arrivalDate)}</Text>
                )}
            </div>
        </div>
    );
}

export default function TripItinerary(props: TripItineraryProps) {
    if (props.stops) {
        return <DetailedItinerary {...props} />;
    }
    return <BriefItinerary {...props} />;
}
