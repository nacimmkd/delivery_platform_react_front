import { create } from "zustand";
import type { UserDetails } from "../types";

type AuthContext = {
    isAuthenticated: boolean;
    isInitializing: boolean;
    user: UserDetails | null;
    setUser: (user: UserDetails | null) => void;
    setInitializing: (val: boolean) => void;
};

const authStore = create<AuthContext>((set) => ({
    isAuthenticated: false,
    isInitializing: true,
    user: null,

    setUser: (user) => set({ user, isAuthenticated: user !== null && user?.verified == true }),
    setInitializing: (val) => set({ isInitializing: val }),
}));

export default authStore;