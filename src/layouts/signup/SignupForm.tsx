import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { paths } from "../../routes/paths";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import Input from "../../components/input/Input";
import Text from "../../components/text/Text";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Divider from "../../components/divider/Devider";
import type { UserCreateRequest } from "../../types";
import type { ApiError } from "../../types/ApiError";
import { isValidationError } from "../../types/ApiError";

type SignupFormProps = {
    form: UserCreateRequest;
    isLoading: boolean;
    error: ApiError | null;
    fieldErrors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onGoogleClick: () => void;
};

export default function SignupForm({
    form,
    isLoading,
    error,
    fieldErrors,
    onChange,
    onSubmit,
    onGoogleClick,
}: SignupFormProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.container}>

            {error && !isValidationError(error) && (
                <Text className={styles.error} align="center" animate="slideUp">{error.message}</Text>
            )}

            <div className={styles.heading}>
                <Text tag="h1" weight="bold" size={2}>Create your account</Text>
                <Text tag="p" muted>Join Ecolis and start sending parcels</Text>
            </div>

            <form className={styles.form} onSubmit={onSubmit}>

                <div className={styles.row}>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="First name"
                        placeholder="Nacim"
                        autoComplete="given-name"
                        required
                        onChange={onChange}
                        value={form.firstName}
                        error={fieldErrors.firstName}
                    />
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="Last name"
                        placeholder="Benali"
                        autoComplete="family-name"
                        required
                        onChange={onChange}
                        value={form.lastName}
                        error={fieldErrors.lastName}
                    />
                </div>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="vous@exemple.com"
                    autoComplete="email"
                    required
                    onChange={onChange}
                    value={form.email}
                    error={fieldErrors.email}
                />

                <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    onChange={onChange}
                    value={form.password}
                    error={fieldErrors.password}
                    hint={<Text tag="small" muted>At least 8 characters</Text>}
                    suffix={
                        <Icon
                            className={styles.toggle}
                            onClick={() => setShowPassword((v) => !v)}
                            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        />
                    }
                />

                <label className={styles.terms}>
                    <input className={styles.checkbox} type="checkbox" required />
                    <span>
                        I agree to the{" "}
                        <Link className={styles.link} to={""}>Terms</Link>
                        {" "}and{" "}
                        <Link className={styles.link} to={""}>Privacy Policy</Link>
                    </span>
                </label>

                <Button
                    label="Create account"
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
                Already have an account? <Link className={styles.link} to={paths.login}>Sign in</Link>
            </p>

        </div>
    );
}