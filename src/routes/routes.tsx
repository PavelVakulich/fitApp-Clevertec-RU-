import { AuthPage } from '@pages/auth-page';
import { LayoutAuth } from '@pages/auth-page/layout-auth';
import { RegistrationPage } from '@pages/auth-page/registration-page';
import { LoginError } from '@pages/auth-page/result-pages/LoginError';
import { RegisterErrorUserExist } from '@pages/auth-page/result-pages/RegisterErrorUserExist';
import { RegisterError } from '@pages/auth-page/result-pages/RegisterError';
import { BasicLayoutResult } from '@pages/auth-page/result-pages/BasicLayoutResult';
import { RegisterSuccess } from '@pages/auth-page/result-pages/RegisterSuccess';
import { MainPage } from '@pages/MainPage';
import { ForgotPasswordErrorNoEmail } from '@pages/auth-page/result-pages/ForgotPasswordErrorNoEmail';
import { ForgotPasswordError } from '@pages/auth-page/result-pages/ForgotPasswordError';
import { ChangePasswordSuccess } from '@pages/auth-page/result-pages/ChangePasswordSuccess';
import { ChangePasswordError } from '@pages/auth-page/result-pages/ChangePasswordError';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@pages/auth-page/layout';
import { AuthRoutes } from '@components/auth-routes';
import { UnauthRoutes } from '@components/unauth-routes';
import { ConfirmEmailPage } from '@pages/auth-page/confirm-email';
import { ChangePasswordPage } from '@pages/auth-page/ChangePasswordForm';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { LayoutMain } from '@pages/layout';
import { CalendarPage } from '@pages/calendar-page';
import { PATHS } from '@constants/paths';

export const NavigationItems = () => {
    return (
        <Routes>
            <Route element={<AuthRoutes />}>
                <Route element={<LayoutMain />}>
                    <Route path={PATHS.DEFAULT} element={<Navigate to={PATHS.MAIN} replace />} />
                    <Route path={PATHS.MAIN} element={<MainPage />} />
                    <Route path={PATHS.FEEDBACKS} element={<FeedbacksPage />} />
                    <Route path={PATHS.CALENDAR} element={<CalendarPage />} />
                </Route>
            </Route>
            <Route element={<UnauthRoutes />}>
                <Route path={PATHS.DEFAULT} element={<Navigate to={PATHS.AUTH} replace />} />
                <Route element={<Layout />}>
                    <Route path={PATHS.AUTH} element={<LayoutAuth />}>
                        <Route index element={<AuthPage />} />
                        <Route path={PATHS.REGISTER} element={<RegistrationPage />} />
                    </Route>

                    <Route path={PATHS.AUTH} element={<BasicLayoutResult />}>
                        <Route path={PATHS.FORGOT_PASSWORD} element={<ConfirmEmailPage />} />
                        <Route path={PATHS.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
                    </Route>
                    <Route path={PATHS.RESULT} element={<BasicLayoutResult />}>
                        <Route path={PATHS.LOGIN_ERROR} element={<LoginError />} />
                        <Route path={PATHS.REGISTER_SUCCESS} element={<RegisterSuccess />} />
                        <Route
                            path={PATHS.CHANGE_PASSWORD_SUCCESS}
                            element={<ChangePasswordSuccess />}
                        />
                        <Route
                            path={PATHS.REGISTER_ERROR_USER_EXIST}
                            element={<RegisterErrorUserExist />}
                        />
                        <Route path={PATHS.REGISTER_ERROR} element={<RegisterError />} />
                        <Route
                            path={PATHS.FORGOT_PASSWORD_ERROR_NO_EMAIL}
                            element={<ForgotPasswordErrorNoEmail />}
                        />
                        <Route
                            path={PATHS.FORGOT_PASSWORD_ERROR}
                            element={<ForgotPasswordError />}
                        />
                        <Route
                            path={PATHS.CHANGE_PASSWORD_ERROR}
                            element={<ChangePasswordError />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};
