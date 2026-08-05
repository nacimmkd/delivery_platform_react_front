import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { paths } from "../../routes/paths";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import Input from "../../components/input/Input";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Text from "../../components/text/Text";
import type { AuthRequest } from "../../types";
import Divider from "../../components/divider/Devider";

export default function LoginForm() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from ?? paths.home;

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState<AuthRequest>({ email: "", password: "" });
    const { login, isLoading, error } = useAuth();


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name , value } = e.target;
        setForm(prev => ({ ...prev, [name]: value}))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const success = await login(form);
        if (success) navigate(from, { replace: true });
    }

    return (
        <div className={styles.container}>

            <div className={styles.heading}>
                <Text tag="h1" weight="bold" size={2} className={styles.title}>Welcome back</Text>
                <Text tag="p" className={styles.subtitle}>Sign in to your Ecolis account</Text>
            </div>


            <form className={styles.form} onSubmit={handleSubmit}>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={form.email}
                    placeholder="vous@exemple.com"
                    autoComplete="email"
                    required
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    hint={
                        <Link className={styles.forgot} to={paths.reset_password}>
                            Forgot password?
                        </Link>
                    }
                    suffix={
                        <Icon
                            className={styles.toggle}
                            onClick={() => setShowPassword((v) => !v)}
                            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        />
                    }
                />

                {error && <Text color="red" align="center">{error}</Text>}

                <Button 
                    label="Sign in"
                    type="submit" 
                    variant="main" 
                    icon={
                        <Icon icon={<ArrowUpRight size={20}/>}/>
                    }
                    iconPosition="right" 
                    loading={isLoading}
                />
            </form>

            <Divider text="OR CONTINUE WITH" />
            
            <Button label="Google" variant="secondary" icon={<Icon src="./google_logo.png"/>} iconPosition="left" />

            <p className={styles.footer}>New to Ecolis? <Link className={styles.link} to={paths.signup}>Create an account</Link></p>

        </div>
    );
}