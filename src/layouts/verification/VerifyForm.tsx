import styles from "./VerifyForm.module.css";
import { Mail } from "lucide-react";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import Text from "../../components/text/Text";
import type { ApiError } from "../../types/ApiError";

type VerifyFormProps = {
    email: string;
    sent: boolean;
    isLoading: boolean;
    error: ApiError | null;
    onSend: () => void;
};

export default function VerifyForm({ email, sent, isLoading, error, onSend }: VerifyFormProps) {

    if (!sent) {
        return (
            <div className={styles.container}>

                <div className={styles.heading}>
                    <Text tag="h1" weight="bold" size={2}>Vérifiez votre email</Text>
                    <Text tag="p" muted>
                        Nous allons envoyer un lien de vérification à {email}
                    </Text>
                </div>

                {error && <Text color="red" align="center">{error.message}</Text>}

                <Button
                    label="Envoyer le lien"
                    variant="main"
                    fullWidth
                    icon={<Icon icon={<Mail size={20} />} />}
                    iconPosition="left"
                    loading={isLoading}
                    onClick={onSend}
                />

            </div>
        );
    }

    return (
        <div className={styles.container}>

            <div className={styles.heading}>
                <Text tag="h1" weight="bold" size={2}>Vérifiez votre boîte mail</Text>
                <Text tag="p" muted>
                    Un lien de vérification a été envoyé à {email}. Cliquez dessus pour activer votre compte.
                </Text>
            </div>

            {error && <Text color="red" align="center">{error.message}</Text>}

            <Text tag="p" align="center" muted>
                Pas reçu ?{" "}
                <span className={styles.resend} onClick={onSend}>
                    Renvoyer
                </span>
            </Text>

        </div>
    );
}