
export type ApiError = {
    code: string;
    status: number;
    message: string;
    path: string;
    timestamp: string;
};

export type ApiValidationError = ApiError & {
    errors: ValidationError[];
};

type ValidationError = {
    field: string;
    message: string;
};

export const DEFAULT_ERROR: ApiError = {
    code: "UNKNOWN_ERROR",
    status: 500,
    message: "Une erreur inattendue est survenue",
    path: "",
    timestamp: new Date().toISOString(),
};

export function isValidationError(err: ApiError): err is ApiValidationError {
    return "errors" in err && Array.isArray((err as ApiValidationError).errors);
}