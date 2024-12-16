import { PATHS } from '@constants/paths';
import { setCredentials } from '@redux/authSlice';
import { useAppDispatch, useAppSelector } from '@redux/storeSetting';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const AuthRoutes = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const authToken = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const googleAccessToken = urlParams.get('accessToken');

        if (googleAccessToken) {
            localStorage.setItem('authToken', googleAccessToken);
            dispatch(setCredentials({ accessToken: googleAccessToken }));
        }
    }, [dispatch, location.search]);

    const accessToken = authToken || localStorage.getItem('authToken');

    return accessToken ? <Outlet /> : <Navigate to={PATHS.AUTH} replace />;
};
