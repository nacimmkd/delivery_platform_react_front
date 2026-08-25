import {ArrowUpRight} from "lucide-react";
import { Link} from "react-router-dom";
import styles from "./MatchResult.module.css"
import type {MatchResultDto} from "@/shared/types";
import Divider from "@/shared/components/divider/Divider.tsx";
import Price from "@/shared/components/price/Price.tsx";
import { paths } from "@/app/routes/paths.ts";
import UserBrief from "@/features/profile/components/UserBrief/UserBrief.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import TripItinerary from "@/features/trips/components/TripItinerary/TripItinerary.tsx";

type SearchResultProps = {
    result: MatchResultDto;
}

export default function MatchResult({ result }: SearchResultProps) {

    const { trip, owner, price } = result;
    const instantBooking = trip?.instantBooking;

    return (
        <div className={styles.container}>
            {instantBooking && <Tag className={styles.tag} value="Instantané" variant="accent"/>}
            <div className={styles.left_container}>
                <TripItinerary
                    departure={trip?.departure}
                    arrival={trip?.arrival}
                    departureDate={trip?.departureDate}
                    arrivalDate={trip?.arrivalDate}
                    stopCount={trip?.stopCount}
                />
            </div>

            <Divider orientation="vertical" className={styles.divider} />

            <Link to={paths.profile} className={styles.middle_container}>
                {owner && <UserBrief user={owner} />}
            </Link>

            <Divider orientation="vertical" className={styles.divider} />

            <div className={styles.right_container}>
                <div className={styles.price_container}>
                    <Price totalPrice={price}
                           pricePerKg={trip?.pricePerKg}
                           label="Prix total"
                           align="right"/>
                </div>

                <Button label={"Réserver"}
                        className={styles.button}
                        fullWidth
                        icon={<ArrowUpRight />}
                        iconPosition="right"
                        animate="slideUp"
                        delay={400}/>
            </div>
        </div>
    )
}
