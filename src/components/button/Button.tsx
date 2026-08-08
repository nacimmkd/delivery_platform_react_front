
import Spinner from "../../components/spinner/Spinner";
import styles from "./Button.module.css"

type Size = "sm" | "md" | "lg";
type Variant = "main" | "secondary" | "ghost" | "danger";

type ButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    fullWidth?: boolean;
    className?: string;
};

export default function Button({
    label,
    type = "button",
    onClick,
    variant = "main",
    size = "md",
    disabled = false,
    loading = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
    className = "",
}: ButtonProps) {

    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        loading ? styles.loading : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <button
            className={classes}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            aria-busy={loading}
        >
            {loading && <Spinner/>}
            {!loading && icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
            <span>{label}</span>
            {!loading && icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
        </button>
    );
};