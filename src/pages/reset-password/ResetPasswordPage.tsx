
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ResetPasswordPage.module.css";
import { paths } from "../../routes/paths";
import usePasswordReset from "../../hooks/usePasswordReset";
import ResetPasswordForm from "../../layouts/reset_password/ResetPasswordForm";

export default function ResetPasswordPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [email, setEmail] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const { requestPasswordReset, resetPassword, isLoading, error, fieldErrors } = usePasswordReset();

    async function handleRequestSubmit(e: React.FormEvent) {
        e.preventDefault();
        const success = await requestPasswordReset({ email });
        if (success) setRequestSent(true);
    }

    async function handleResetSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!token) return;

        const success = await resetPassword({ token, newPassword });
        if (success) {
            navigate(paths.login, { state: { message: "Mot de passe réinitialisé. Connectez-vous." } });
        }
    }

    return (
        <div className={styles.container}>
            <ResetPasswordForm
                token={token}
                email={email}
                onEmailChange={(e) => setEmail(e.target.value)}
                onRequestSubmit={handleRequestSubmit}
                requestSent={requestSent}
                newPassword={newPassword}
                onPasswordChange={setNewPassword}
                onResetSubmit={handleResetSubmit}
                isLoading={isLoading}
                error={error}
                fieldErrors={fieldErrors}
            />
        </div>
    );
}