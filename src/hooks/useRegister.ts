import { useState } from "react";
import authStore from "../store/auth.store";
import userService from "../services/users.service";
import type {
    RequestEmailVerification,
    UserCreateRequest,
    UserDetails,
    VerifyEmailRequest,
} from "../types";
import type { ApiError } from "../types/ApiError";
import { extractError, extractFieldErrors } from "../utils/extractError";

type RegisterResult = {
    user: UserDetails | null;
    error: ApiError | null;
};

export default function useRegister() {

    const setUser = authStore((s) => s.setUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    function resetErrors() {
        setError(null);
        setFieldErrors({});
    }

    function handleError(err: unknown): ApiError {
        const apiError = extractError(err);
        setError(apiError);
        setFieldErrors(extractFieldErrors(err));
        return apiError;
    }

    async function register(data: UserCreateRequest): Promise<RegisterResult> {
        setIsLoading(true);
        resetErrors();
        try {
            const user = await userService.register(data);
            setUser(user);
            return { user, error: null };
        } catch (err) {
            const apiError = handleError(err);
            return { user: null, error: apiError };
        } finally {
            setIsLoading(false);
        }
    }

    async function verifyEmail(data: VerifyEmailRequest): Promise<boolean> {
        setIsLoading(true);
        resetErrors();
        try {
            await userService.verifyEmail(data);
            return true;
        } catch (err) {
            handleError(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    async function requestEmailVerification(data: RequestEmailVerification): Promise<boolean> {
        setIsLoading(true);
        resetErrors();
        try {
            await userService.requestEmailVerification(data);
            return true;
        } catch (err) {
            handleError(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return { register, verifyEmail, requestEmailVerification, isLoading, error, fieldErrors, resetErrors };
}