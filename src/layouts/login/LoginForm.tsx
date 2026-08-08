
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { paths } from "../../routes/paths";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import Input from "../../components/input/Input";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Text from "../../components/text/Text";
import type { AuthRequest } from "../../types";
import type { ApiError } from "../../types/ApiError";
import { isValidationError } from "../../types/ApiError";
import Divider from "../../components/divider/Devider";
import { useState } from "react";

type LoginFormProps = {
    form: AuthRequest;
    isLoading: boolean;
    error: ApiError | null;
    message: String | null;
    fieldErrors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onGoogleClick: () => void;
};

export default function LoginForm({
    form,
    isLoading,
    error,
    message,
    fieldErrors,
    onChange,
    onSubmit,
    onGoogleClick,
}: LoginFormProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.container}>

            {error && !isValidationError(error) && (
                 <Text className={styles.error} align="center" animate="slideUp">{error.message}</Text>
            )}

            {message && (
                <Text className={styles.message} align="center" animate="slideUp">{message}</Text>
            )}

            <div className={styles.heading}>
                <Text tag="h1" weight="bold" size={2} className={styles.title}>Welcome back</Text>
                <Text tag="p" className={styles.subtitle}>Sign in to your Ecolis account</Text>
            </div>

            <form className={styles.form} onSubmit={onSubmit}>
                

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={form.email}
                    placeholder="vous@exemple.com"
                    autoComplete="email"
                    required
                    onChange={onChange}
                    error={fieldErrors.email}
                />

                <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={form.password}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    onChange={onChange}
                    error={fieldErrors.password}
                    suffix={
                        <Icon
                            className={styles.toggle}
                            onClick={() => setShowPassword((v) => !v)}
                            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        />
                    }
                    hint={
                        <Link className={styles.forgot} to={paths.reset_password}>Forgot password?</Link>
                    }
                />

                <Button
                    label="Sign in"
                    type="submit"
                    variant="main"
                    fullWidth
                    icon={<Icon icon={<ArrowUpRight size={20} />} />}
                    iconPosition="right"
                    loading={isLoading}
                />
            </form>

            <Divider text="OR CONTINUE WITH" />

            <Button
                label="Google"
                variant="secondary"
                fullWidth
                onClick={onGoogleClick}
                icon={<Icon src="/google_logo.png" size={18} />}
                iconPosition="left"
            />

            <p className={styles.footer}>
                New to Ecolis? <Link className={styles.link} to={paths.signup}>Create an account</Link>
            </p>

        </div>
    );
}