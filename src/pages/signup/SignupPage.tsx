
import SignupForm from "../../layouts/signup/SignupForm";
import styles from "./SignupPage.module.css"

export default function SignupPage() {

    return (
        <div className={styles.container}>
            <SignupForm/>
        </div>
    );
}