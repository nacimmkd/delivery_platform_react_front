import styles from "./Icon.module.css"

type IconProps = {
    src?: string;               // image (ex: "/google_logo.png")
    icon?: React.ReactNode;     // lucide-react (ex: <ArrowUpRight/>)
    size?: number;
    onClick?: () => void;
    className?: string;
    label?: string;
};

export default function Icon({
    src,
    icon,
    size = 24,
    onClick,
    className = "",
    label,
}: IconProps) {

    const classes = [
        styles.icon,
        onClick ? styles.clickable : "",
        className,
    ].filter(Boolean).join(" ");

    if (src) {
        return (
            <img
                className={classes}
                src={src}
                alt={label ?? ""}
                width={size}
                height={size}
                onClick={onClick}
            />
        );
    }

    if (icon) {
        return (
            <span
                className={classes}
                onClick={onClick}
                aria-label={label}
                aria-hidden={!label}
                style={{ width: size, height: size, display: "inline-flex", alignItems: "center" }}
            >
                {icon}
            </span>
        );
    }

    return null;
}