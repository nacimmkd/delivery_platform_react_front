import { useState } from "react";
import styles from "./ResetPasswordForm.module.css";
import { ArrowUpRight, Eye, EyeOff, Mail } from "lucide-react";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import Input from "../../components/input/Input";
import Text from "../../components/text/Text";
import type { ApiError } from "../../types/ApiError";
import { isValidationError } from "../../types/ApiError";

type ResetPasswordFormProps = {
    token: string | null;

    email: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRequestSubmit: (e: React.FormEvent) => void;
    requestSent: boolean;

    newPassword: string;
    onPasswordChange: (value: string) => void;
    onResetSubmit: (e: React.FormEvent) => void;

    isLoading: boolean;
    error: ApiError | null;
    fieldErrors: Record<string, string>;
};

export default function ResetPasswordForm({
    token,
    email,
    onEmailChange,
    onRequestSubmit,
    requestSent,
    newPassword,
    onPasswordChange,
    onResetSubmit,
    isLoading,
    error,
    fieldErrors,
}: ResetPasswordFormProps) {

    const [showPassword, setShowPassword] = useState(false);

    /* ---- Pas de token : demande d'envoi du lien ----------------------------- */

    if (!token) {

        if (requestSent) {
            return (
                <div className={styles.container}>
                    <div className={styles.heading}>
                        <Text tag="h1" weight="bold" size={2}>Vérifiez votre boîte mail</Text>
                        <Text tag="p" muted>
                            Si un compte existe pour {email}, un lien de réinitialisation vient d'être envoyé.
                        </Text>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.container}>

                <div className={styles.heading}>
                    <Text tag="h1" weight="bold" size={2}>Mot de passe oublié</Text>
                    <Text tag="p" muted>Entrez votre email pour recevoir un lien de réinitialisation</Text>
                </div>

                <form className={styles.form} onSubmit={onRequestSubmit}>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        value={email}
                        placeholder="vous@exemple.com"
                        autoComplete="email"
                        required
                        onChange={onEmailChange}
                        error={fieldErrors.email}
                    />

                    {error && !isValidationError(error) && (
                        <Text color="red" align="center">{error.message}</Text>
                    )}

                    <Button
                        label="Envoyer le lien"
                        type="submit"
                        variant="main"
                        fullWidth
                        icon={<Icon icon={<Mail size={20} />} />}
                        iconPosition="left"
                        loading={isLoading}
                    />

                </form>

            </div>
        );
    }

    /* ---- Token présent : saisie du nouveau mot de passe ----------------------------- */

    return (
        <div className={styles.container}>

            <div className={styles.heading}>
                <Text tag="h1" weight="bold" size={2}>Nouveau mot de passe</Text>
                <Text tag="p" muted>Choisissez un nouveau mot de passe pour votre compte</Text>
            </div>

            <form className={styles.form} onSubmit={onResetSubmit}>

                <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    label="Nouveau mot de passe"
                    value={newPassword}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    onChange={(e) => onPasswordChange(e.target.value)}
                    error={fieldErrors.newPassword}
                    hint={<Text tag="small" muted>Au moins 8 caractères</Text>}
                    suffix={
                        <Icon
                            className={styles.toggle}
                            onClick={() => setShowPassword((v) => !v)}
                            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        />
                    }
                />

                {error && !isValidationError(error) && (
                    <Text color="red" align="center">{error.message}</Text>
                )}

                <Button
                    label="Réinitialiser"
                    type="submit"
                    variant="main"
                    fullWidth
                    icon={<Icon icon={<ArrowUpRight size={20} />} />}
                    iconPosition="right"
                    loading={isLoading}
                />

            </form>

        </div>
    );
}