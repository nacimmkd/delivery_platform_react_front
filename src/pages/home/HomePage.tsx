import styles from "./HomePage.module.css"
import Text from "../../components/text/Text";
import { ArrowUpRight, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";

export default function HomePage() {
    return (
        <div className={styles.container}>

            <div className={styles.heading_container}>
                <Text className={styles.label} tag="p" align="center" weight="bold" animate="fadeIn" muted>
                    <Circle size={12} fill="currentColor" />
                    Livraison responsable
                </Text>
                <Text className={styles.title} tag="h1" align="center" size={5} weight="bold" animate="slideUp" delay={100}>
                    Envoyez vos colis, respectez la planète
                </Text>
                <Text className={styles.subtitle} tag="p" align="center" animate="slideUp" delay={200}>
                    Ecolis repense la logistique du quotidien — suivi en temps réel,
                    paiements sécurisés et trajets partagés pour livrer malin et vert.
                </Text>
            </div>

            <div className={styles.links_container}>
                <Link className={`${styles.link} ${styles.main} ${styles.animate_link}`} to={paths.parcels}>
                    Send Parcel
                    <ArrowUpRight />
                </Link>
                <Link className={`${styles.link} ${styles.secondary} ${styles.animate_link}`} to={paths.trips}>
                    Share Trip
                    <ArrowUpRight />
                </Link>
            </div>

            <div className={styles.images_container} />

        </div>
    );
}