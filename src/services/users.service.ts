import api from "../config/axios.config";
import type { UserCreateRequest, UserDetails, VerificationCodeRequest } from "../types";

const userService = {

    async getMe(): Promise<UserDetails> {
        const res = await api.get<UserDetails>("/users/me");
        return res.data;
    },

    async register(data: UserCreateRequest): Promise<UserDetails> {
        const res = await api.post<UserDetails>("/users/register", data)
        return res.data;
    },

    async sendVerificationCode(userId: string): Promise<void> {
        await api.post(`/users/${userId}/verification/send`);
    },

    async verify(userId: string, data: VerificationCodeRequest): Promise<void> {
        await api.post(`/users/${userId}/verification/verify`, data);
    },

}

export default userService;