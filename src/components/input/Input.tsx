import styles from "./Input.module.css"

type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search";

type InputProps = {
    id?: string;
    name?: string;
    type?: InputType;
    value?: string;
    placeholder?: string;
    label?: string;
    hint?: React.ReactNode;
    suffix?: React.ReactNode;
    autoComplete?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

export default function Input({
    id,
    name,
    type = "text",
    value,
    placeholder,
    label,
    hint,
    suffix,
    autoComplete,
    required,
    disabled,
    error,
    onChange,
    className = "",
}: InputProps) {
    return (
        <div className={`${styles.field} ${className}`}>

            {(label || hint) && (
                <div className={styles.labelRow}>
                    {label && (
                        <label className={styles.label} htmlFor={id}>
                            {label}
                        </label>
                    )}
                    {hint && <span className={styles.hint}>{hint}</span>}
                </div>
            )}

            <div className={styles.inputWrapper}>
                <input
                    className={`${styles.input} ${suffix ? styles.inputWithSuffix : ""} ${error ? styles.inputError : ""}`}
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    disabled={disabled}
                    onChange={onChange}
                />
                {suffix && <span className={styles.suffix}>{suffix}</span>}
            </div>

            {error && <span className={styles.error}>{error}</span>}

        </div>
    );
}