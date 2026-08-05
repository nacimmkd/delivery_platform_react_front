import styles from "./Background.module.css";

type BackgroundProps = {
    children: React.ReactNode;
};

export default function Background({ children }: BackgroundProps) {
    return (
        <div className={styles.container}>
            <div className={styles.blob} aria-hidden="true" />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}