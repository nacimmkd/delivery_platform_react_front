import api from "../config/axios.config";
import type { AuthRequest } from "../types";

const authService = {

    async login(credentials: AuthRequest): Promise<void> {
        await api.post("/auth/login", credentials)
    },

    async logout(): Promise<void> {
        await api.post("/auth/logout")
    }
}

export default authService;