import styles from "./Header.module.css"

export default function Header() {
    return (
        <div className={styles.container}>
            
            <div className={styles.left_container}>
                <div className={styles.logo_container}>
                    <img className={styles.logo_image} src="/logo.png" alt="Logo" />
                    <h1 className={styles.logo_name}>Ecolis</h1>
                </div>
            </div>

            <div className={styles.right_container}>
                <div className={styles.login_container}>
                    <button className={styles.login_button}>Log In</button>
                    <button className={styles.signin_button}>Sign In</button>
                </div>
                {/* <div className={styles.menu_container}></div> */}
            </div>

        </div>
  );
}