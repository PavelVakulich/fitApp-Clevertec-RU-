import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { setIsLoading } from '@redux/loaderSlice';

export const useLoaderLoading = (isLoading: boolean) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsLoading(isLoading));

        return () => {
            dispatch(setIsLoading(false));
        };
    }, [isLoading, dispatch]);
};
