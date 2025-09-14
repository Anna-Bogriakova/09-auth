'use client'
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ReactNode, useEffect } from "react"

type Props = {
    children: ReactNode;
}


export const AuthProvider = ({ children }: Props) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    useEffect(() => {
        const fetchUser = async () => {
            const isAuthenticated = await checkSession();
            if (isAuthenticated) {
                const user = await getMe();
                if (user) setUser(user);
            } else {
                clearAuth();
            }
        }
        fetchUser();
  },[clearAuth, setUser])

    return children;
}