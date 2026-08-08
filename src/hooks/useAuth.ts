
import { useState } from "react";
import type { AuthRequest } from "../types";
import authService from "../services/auth.service";
import userService from "../services/users.service";
import authStore from "../store/auth.store";
import { extractError, extractFieldErrors } from "../utils/extractError";
import type { ApiError } from "../types/ApiError";

const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";

export default function useAuth() {

    const isAuthenticated = authStore((s) => s.isAuthenticated);
    const setUser = authStore((s) => s.setUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    async function login(credentials: AuthRequest): Promise<ApiError | null> {
        setIsLoading(true);
        setError(null);
        setFieldErrors({});
        try {
            const user = await authService.login(credentials);
            setUser(user);
            return null;
        } catch (err) {
            const apiError = extractError(err);
            setError(apiError);
            setFieldErrors(extractFieldErrors(err));
            return apiError;
        } finally {
            setIsLoading(false);
        }
    }

    async function logout(): Promise<void> {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null)
        } finally {
            setIsLoading(false);
        }
    }

    function loginWithGoogle(): Promise<ApiError | null> {
        setIsLoading(true);
        setError(null);

        const popup = window.open(GOOGLE_AUTH_URL, "google-login", "width=500,height=600");

        if (!popup) {
            setIsLoading(false);
            const apiError: ApiError = {
                code: "POPUP_BLOCKED",
                status: 400,
                message: "Le navigateur a bloqué la fenêtre de connexion.",
                path: "",
                timestamp: new Date().toISOString(),
            };
            setError(apiError);
            return Promise.resolve(apiError);
        }

        return new Promise((resolve) => {
            const listener = async (event: MessageEvent) => {
                if (event.origin !== window.location.origin) return;
                if (event.data?.type !== "oauth-callback") return;

                window.removeEventListener("message", listener);
                clearInterval(checkClosed);
                setIsLoading(false);

                if (event.data.status === "success") {
                    try {
                        const user = await userService.getMe();
                        setUser(user);
                        resolve(null);
                    } catch (err) {
                        const apiError = extractError(err);
                        setError(apiError);
                        resolve(apiError);
                    }
                } else {
                    const apiError: ApiError = {
                        code: event.data.reason ?? "OAUTH_ERROR",
                        status: 400,
                        message: "Erreur de connexion Google.",
                        path: "",
                        timestamp: new Date().toISOString(),
                    };
                    setError(apiError);
                    resolve(apiError);
                }
            };

            window.addEventListener("message", listener);

            const checkClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(checkClosed);
                    window.removeEventListener("message", listener);
                    setIsLoading(false);
                    resolve(null);
                }
            }, 500);
        });
    }

    return { login, logout, loginWithGoogle, isAuthenticated, isLoading, error, fieldErrors };
}