import { create } from "zustand";
import type { UserDetails } from "../types";
import userService from "../services/users.service";

type AuthContext = {
    isAuthenticated: boolean;
    isInitializing: boolean;
    user: UserDetails | null;
    setAuthenticated: (val: boolean) => void;
    setUser: (user: UserDetails | null) => void;
    init: () => Promise<void>;
};

const authStore = create<AuthContext>((set) => ({
    isAuthenticated: false,
    isInitializing: true,
    user: null,
    setAuthenticated: (val) => set({ isAuthenticated: val }),
    setUser: (user) => set({ user }),
    init: async () => {
        try {
            const user = await userService.getMe();
            set({ isAuthenticated: true, user, isInitializing: false });
        } catch {
            set({ isAuthenticated: false, user: null, isInitializing: false });
        }
    }
}));

authStore.getState().init();

export default authStore;