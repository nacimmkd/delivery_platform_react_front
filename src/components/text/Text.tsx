import styles from "./Text.module.css"

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label" | "small";
type Weight = "regular" | "medium" | "semibold" | "bold";
type Align = "left" | "center" | "right";
type Animate = "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";

type TextProps = {
    children: React.ReactNode;
    tag?: Tag;
    weight?: Weight;
    size?: number;
    color?: string;
    align?: Align;
    muted?: boolean;
    animate?: Animate;
    delay?: number; // ms
    className?: string;
    onClick?: () => void;
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
}: TextProps) {

    const classes = [
        styles.text,
        styles[weight],
        muted ? styles.muted : "",
        animate ? styles[animate] : "",
        className,
    ].filter(Boolean).join(" ");

    const style: React.CSSProperties = {
        ...(size ? { fontSize: `${size}rem` } : {}),
        ...(color ? { color } : {}),
        ...(align ? { textAlign: align } : {}),
        ...(delay ? { animationDelay: `${delay}ms` } : {}),
    };

    return (
        <Tag className={classes} style={style} onClick={onClick}>
            {children}
        </Tag>
    );
}