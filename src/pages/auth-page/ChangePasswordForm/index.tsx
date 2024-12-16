import styles from './ChangePassword.module.css';

import { Button, Form, Input, Typography } from 'antd';
import { Wrapper } from '../_components/result/wrapper';
import { Rule } from 'antd/lib/form';
import { useChangePasswordMutation } from '@redux/API/authorizeApi';
import { useLoaderLoading } from '@hooks/useLoader';
import { useAppDispatch } from '@redux/storeSetting';
import { push, replace } from 'redux-first-history';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { PATHS } from '@constants/paths';

type ChangePasswordForm = {
    password: string;
    confirmPassword: string;
};

export const ChangePasswordPage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    useLoaderLoading(isLoading);

    const isRepeat = location.state?.isRepeat as boolean;
    const repeatValues = location.state?.formValues as ChangePasswordForm;

    const onFinish = useCallback(
        async (values: ChangePasswordForm) => {
            try {
                await changePassword(values).unwrap();
                dispatch(replace(PATHS.CHANGE_PASSWORD_SUCCESS, { fromResult: true }));
            } catch (error) {
                dispatch(
                    push(PATHS.CHANGE_PASSWORD_ERROR, { fromResult: true, formValues: values }),
                );
            }
        },
        [changePassword, dispatch],
    );

    useEffect(() => {
        if (isRepeat) {
            onFinish(repeatValues);
        }
    }, [isRepeat, onFinish, repeatValues]);

    const validatePassword: Rule = () => ({
        validator(_, value: string) {
            if (!/(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/.test(value)) {
                return Promise.reject('');
            } else {
                return Promise.resolve();
            }
        },
    });

    const validateConfirm: Rule = ({ getFieldValue }) => ({
        validator(_, value: string) {
            if (value !== getFieldValue('password')) {
                return Promise.reject('Пароли не совпадают');
            } else {
                return Promise.resolve();
            }
        },
    });

    return (
        <Wrapper>
            <div className={styles.form_wrapper}>
                <Typography.Title level={3} className={styles.title}>
                    Восстановление аккауанта
                </Typography.Title>
                <Form
                    name={PATHS.CHANGE_PASSWORD}
                    size='large'
                    onFinish={onFinish}
                    className={styles.form}
                    form={form}
                >
                    <Form.Item
                        name={'password'}
                        rules={[{ required: true }, { min: 8, message: '' }, validatePassword]}
                        className={styles.form_item_password}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password placeholder='Пароль' data-test-id={PATHS.CHANGE_PASSWORD} />
                    </Form.Item>
                    <Form.Item
                        name={'confirmPassword'}
                        dependencies={['password']}
                        rules={[{ required: true, message: '' }, validateConfirm]}
                        className={styles.form_item_confirm_password}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id='change-confirm-password'
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate className={styles.form_button_submit}>
                        {() => (
                            <Button
                                type='primary'
                                htmlType='submit'
                                block
                                data-test-id='change-submit-button'
                                disabled={
                                    form.getFieldsError().filter(({ errors }) => errors.length)
                                        .length > 0
                                }
                            >
                                Сохранить
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </Wrapper>
    );
};
