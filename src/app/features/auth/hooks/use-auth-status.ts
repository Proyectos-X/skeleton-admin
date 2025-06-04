import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';
import type { RootState } from '@/shared/store';

interface JwtPayload {
    exp: number;
    sub: string;
}

export function useAuthStatus() {
    const { accessToken, activeTenant } = useSelector((state: RootState) => state.auth);

    const isAuthenticated = useMemo(() => {
        if (!accessToken) return false;

        try {
            const decoded = jwtDecode<JwtPayload>(accessToken);
            const isExpired = decoded.exp * 1000 < Date.now();
            return !isExpired && !!activeTenant;
        } catch {
            return false;
        }
    }, [accessToken, activeTenant]);

    return { isAuthenticated };
}
