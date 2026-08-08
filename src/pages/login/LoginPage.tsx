import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./LoginPage.module.css";
import LoginForm from "../../layouts/login/LoginForm";
import useAuth from "../../hooks/useAuth";
import useRegister from "../../hooks/useRegister";
import { paths } from "../../routes/paths";
import type { AuthRequest } from "../../types";
import VerifyForm from "../../layouts/verification/VerifyForm";

export default function LoginPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const from = location.state?.from ?? paths.home;

    const [step, setStep] = useState<"login" | "verify">("login");
    const [verifySent, setVerifySent] = useState(false);
    const [verifyMessage, setVerifyMessage] = useState<string | null>(null);
    const [form, setForm] = useState<AuthRequest>({ email: "", password: "" });

    const { login, isLoading, error, fieldErrors, loginWithGoogle  } = useAuth();
    const {
        requestEmailVerification,
        verifyEmail,
        isLoading: isVerifyLoading,
        error: verifyError,
    } = useRegister();

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) return;

        verifyEmail({ token }).then((success) => {
            setVerifyMessage(success ? "Email vérifié ! Vous pouvez vous connecter." : null);
            navigate(paths.login)
        });
    }, [searchParams]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const loginError = await login(form);

        if (!loginError) {
            navigate(from, { replace: true });
            return;
        }

        if (loginError.code === "USER_NOT_VERIFIED") {
            setStep("verify");
        }
    }

    async function handleGoogleClick() {
        const err = await loginWithGoogle();
        if (!err) {
            navigate(from, { replace: true });
        }
    }

    async function handleSendVerification() {
        const success = await requestEmailVerification({ email: form.email });
        if (success) setVerifySent(true);
    }

    return (
        <div className={styles.container}>

            {step === "login" ? (
                <LoginForm
                    form={form}
                    isLoading={isLoading}
                    error={error}
                    message={verifyMessage}
                    fieldErrors={fieldErrors}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onGoogleClick={handleGoogleClick}
                />
            ) : (
                <VerifyForm
                    email={form.email}
                    sent={verifySent}
                    isLoading={isVerifyLoading}
                    error={verifyError}
                    onSend={handleSendVerification}
                />
            )}

        </div>
    );
}