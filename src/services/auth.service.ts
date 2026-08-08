import api from "../config/axios.config";
import type { AuthRequest, UserDetails } from "../types";

const authService = {

    async login(credentials: AuthRequest): Promise<UserDetails> {
        const res = await api.post<UserDetails>("/auth/login", credentials);
        return res.data;
    },

    async refresh(): Promise<UserDetails> {
        const res = await api.post<UserDetails>("/auth/refresh");
        return res.data;
    },

    async logout(): Promise<void> {
        await api.post("/auth/logout");
    },

};

export default authService;