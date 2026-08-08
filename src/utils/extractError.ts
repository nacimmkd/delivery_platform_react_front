
import axios from "axios";
import { DEFAULT_ERROR, isValidationError, type ApiError } from "../types/ApiError";


export function extractError(err: unknown): ApiError {
    if (!axios.isAxiosError(err)) {
        return DEFAULT_ERROR;
    }


    if (!err.response) {
        return {
            ...DEFAULT_ERROR,
            code: "NETWORK_ERROR",
            status: 0,
            message: "Impossible de joindre le serveur",
        };
    }

    const data = err.response.data;


    if (!data || typeof data !== "object" || !("code" in data)) {
        return {
            ...DEFAULT_ERROR,
            status: err.response.status,
        };
    }

    return data as ApiError;
}


export function extractFieldErrors(err: unknown): Record<string, string> {
    const apiError = extractError(err);

    if (!isValidationError(apiError)) {
        return {};
    }

    return apiError.errors.reduce((acc, e) => {
        acc[e.field] = e.message;
        return acc;
    }, {} as Record<string, string>);
}