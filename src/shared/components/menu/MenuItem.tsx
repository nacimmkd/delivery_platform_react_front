import type { AppPath } from "@/app/routes/paths";
import styles from "./MenuItem.module.css"
import { Link } from "react-router-dom";

type MenuItemProps = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    to?: AppPath;
    danger?: boolean;
};

export default function MenuItem({ label, icon, onClick, to, danger }: MenuItemProps) {

    const classes = `${styles.item} ${danger ? styles.danger : ""}`;

    if (to) {
        return (
            <Link className={classes} to={to}>
                {icon && <span className={styles.icon}>{icon}</span>}
                {label}
            </Link>
        );
    }

    return (
        <button className={classes} onClick={onClick}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {label}
        </button>
    );
}