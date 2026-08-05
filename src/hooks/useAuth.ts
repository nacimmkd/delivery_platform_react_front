import { useState } from "react";
import type { AuthRequest } from "../types";
import authService from "../services/auth.service";
import axios from "axios";
import authStore from "../store/auth.store";

export default function useAuth() {

    const isAuthenticated = authStore((s) => s.isAuthenticated);
    const setAuthenticated = authStore((s) => s.setAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function login(credentials: AuthRequest) {
        setIsLoading(true);
        setError(null);
        try {
            await authService.login(credentials);
            setAuthenticated(true);
            return true;
        } catch (err) {
            setAuthenticated(false);
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message
                    ?? err.response?.data
                    ?? "Email ou mot de passe incorrect";
                setError(message);
            } else {
                setError("Une erreur inattendue est survenue");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    async function logout() {
        await authService.logout();
        setAuthenticated(false);
    }

    return { login, logout, isAuthenticated, isLoading, error };
}