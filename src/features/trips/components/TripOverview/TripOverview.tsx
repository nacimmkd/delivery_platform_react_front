import { Euro, Route, WeightTilde, Zap } from "lucide-react";
import styles from "./TripOverview.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Container from "@/shared/components/container/Container.tsx";
import formatPrice from "@/shared/utils/formatPrice.ts";
import type { Price } from "@/shared/types";

type TripOverviewProps = {
    pricePerKg?: Price;
    availableWeightKg?: number;
    remainingWeightKg?: number;
    maxDetourKm?: number;
    instantBooking?: boolean;
    notes?: string;
};

export default function TripOverview({
    pricePerKg,
    availableWeightKg,
    remainingWeightKg,
    maxDetourKm,
    instantBooking,
    notes,
}: TripOverviewProps) {
    return (
        <div className={styles.container}>
            <Container direction="row" align="center" gap={8} className={styles.details_container}>
                <Tag size="md" icon={<Euro />} value={`${formatPrice(pricePerKg)}/kg`} />
                <Tag size="md" icon={<WeightTilde />} value={`${remainingWeightKg ?? availableWeightKg}/${availableWeightKg} kg`} />
                <Tag size="md" icon={<Route />} value={`${maxDetourKm} km détour max`} />
                {instantBooking && (
                    <Tag size="md" icon={<Zap />} value="Instantané" variant="accent" />
                )}
            </Container>

            {notes && (
                <Text tag="p" muted>{notes}</Text>
            )}
        </div>
    );
}
