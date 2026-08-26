import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";
import styles from "./PaymentPage.module.css";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Text from "@/shared/components/text/Text.tsx";
import useCreateCheckout from "@/features/payments/hooks/useCreateCheckout.ts";
import { stripePromise } from "@/app/config/stripe.config.ts";
import { bookingDetailsPath } from "@/app/routes/paths.ts";

export default function PaymentPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { createCheckout, isLoading } = useCreateCheckout();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!id) return;

        createCheckout(id).then((result) => {
            if (result?.clientSecret) {
                setClientSecret(result.clientSecret);
            } else {
                setFailed(true);
            }
        });
    }, [id, createCheckout]);

    function handleComplete() {
        void queryClient.invalidateQueries({ queryKey: ["booking", id] });
        navigate(bookingDetailsPath(id ?? ""), { replace: true });
    }

    if (failed) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Text tag="p" align="center">Impossible d'initialiser le paiement. Veuillez réessayer.</Text>
            </Container>
        );
    }

    if (isLoading || !clientSecret) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.iconBadge}>
                        <CreditCard size={26} />
                    </div>
                    <Text tag="h2" weight="bold">Paiement</Text>
                </div>

                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret, onComplete: handleComplete }}
                >
                    <EmbeddedCheckout className={styles.checkout} />
                </EmbeddedCheckoutProvider>
            </div>
        </div>
    );
}
