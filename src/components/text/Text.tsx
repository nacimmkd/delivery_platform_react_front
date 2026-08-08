// Text.tsx
import styles from "./Text.module.css"

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label" | "small";
type Weight = "regular" | "medium" | "semibold" | "bold";
type Align = "left" | "center" | "right";
type Animate = "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";
type IconPosition = "left" | "right";

type TextProps = {
    children: React.ReactNode;
    tag?: Tag;
    weight?: Weight;
    size?: number;
    color?: string;
    align?: Align;
    muted?: boolean;
    animate?: Animate;
    delay?: number;
    className?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
};

const justifyMap: Record<Align, React.CSSProperties["justifyContent"]> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
};

export default function Text({
    children,
    tag: Tag = "p",
    weight = "regular",
    size,
    color,
    align,
    muted = false,
    animate,
    delay = 0,
    className = "",
    onClick,
    icon,
    iconPosition = "left",
}: TextProps) {

    const classes = [
        styles.text,
        styles[weight],
        muted ? styles.muted : "",
        animate ? styles[animate] : "",
        icon ? styles.withIcon : "",
        className,
    ].filter(Boolean).join(" ");

    const style: React.CSSProperties = {
        ...(size ? { fontSize: `${size}rem` } : {}),
        ...(color ? { color } : {}),
        ...(align ? { textAlign: align } : {}),
        ...(icon && align ? { justifyContent: justifyMap[align] } : {}),
        ...(delay ? { animationDelay: `${delay}ms` } : {}),
    };

    return (
        <Tag className={classes} style={style} onClick={onClick}>
            {icon && iconPosition === "left" && (
                <span className={styles.icon}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
                <span className={styles.icon}>{icon}</span>
            )}
        </Tag>
    );
}