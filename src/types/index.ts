import type { components } from "./api.d.ts";

// --- Auth ---
export type AuthRequest             = components["schemas"]["AuthRequest"];
export type UserCreateRequest       = components["schemas"]["UserCreateRequest"];
export type UpdatePasswordRequest   = components["schemas"]["UpdatePasswordRequest"];
export type VerificationCodeRequest = components["schemas"]["VerificationCodeRequest"];

// --- User ---
export type UserDetails             = components["schemas"]["UserDetails"];
export type UserSummary             = components["schemas"]["UserSummary"];
export type UserBrief               = components["schemas"]["UserBrief"];

// --- Profile ---
export type ProfileDetails          = components["schemas"]["ProfileDetails"];
export type ProfileSummary          = components["schemas"]["ProfileSummary"];
export type ProfileUpdateRequest    = components["schemas"]["ProfileUpdateRequest"];
