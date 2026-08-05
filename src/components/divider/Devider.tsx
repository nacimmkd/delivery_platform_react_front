import styles from "./Devider.module.css"

type DividerProps = {
    text?: string;
};

export default function Divider({text}: DividerProps) {

    return (
        <div className={styles.divider}>
            {text && <span className={styles.dividerText}>{text}</span>}
        </div>
    )
}