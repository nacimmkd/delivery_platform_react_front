import { useState } from "react";
import userService from "../services/users.service";
import type { RequestPasswordReset, ResetPasswordRequest } from "../types";
import type { ApiError } from "../types/ApiError";
import { extractError, extractFieldErrors } from "../utils/extractError";

export default function usePasswordReset() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    function resetErrors() {
        setError(null);
        setFieldErrors({});
    }

    async function requestPasswordReset(data: RequestPasswordReset): Promise<boolean> {
        setIsLoading(true);
        resetErrors();
        try {
            await userService.requestPasswordReset(data);
            return true;
        } catch (err) {
            setError(extractError(err));
            setFieldErrors(extractFieldErrors(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    async function resetPassword(data: ResetPasswordRequest): Promise<boolean> {
        setIsLoading(true);
        resetErrors();
        try {
            await userService.resetPassword(data);
            return true;
        } catch (err) {
            setError(extractError(err));
            setFieldErrors(extractFieldErrors(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return { requestPasswordReset, resetPassword, isLoading, error, fieldErrors };
}