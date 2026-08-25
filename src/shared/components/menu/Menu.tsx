
import styles from "./Menu.module.css"

type MenuProps = {
    isOpen: boolean;
    children: React.ReactNode;
};

export default function Menu({ isOpen, children }: MenuProps) {

    if (!isOpen) return null;

    return (
        <div className={styles.menu}>
            {children}
        </div>
    );
}