import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import SignupForm from "../../layouts/signup/SignupForm";
import useRegister from "../../hooks/useRegister";
import useAuth from "../../hooks/useAuth";
import { paths } from "../../routes/paths";
import type { UserCreateRequest } from "../../types";
import VerifyForm from "../../layouts/verification/VerifyForm";

export default function SignupPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from ?? paths.home;

    const [step, setStep] = useState<"register" | "verify">("register");
    const [verifySent, setVerifySent] = useState(false);
    const [form, setForm] = useState<UserCreateRequest>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const { register, requestEmailVerification, isLoading, error, fieldErrors } = useRegister();
    const { loginWithGoogle } = useAuth();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { user, error: registerError } = await register(form);

        if (user || registerError?.code === "USER_NOT_VERIFIED") {
            setStep("verify");
            setVerifySent(true);
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

            {step === "register" ? (
                <SignupForm
                    form={form}
                    isLoading={isLoading}
                    error={error}
                    fieldErrors={fieldErrors}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onGoogleClick={handleGoogleClick}
                />
            ) : (
                <VerifyForm
                    email={form.email}
                    sent={verifySent}
                    isLoading={isLoading}
                    error={error}
                    onSend={handleSendVerification}
                />
            )}

        </div>
    );
}