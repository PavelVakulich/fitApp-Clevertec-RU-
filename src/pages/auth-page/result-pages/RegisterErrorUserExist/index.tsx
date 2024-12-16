import { Wrapper } from '@pages/auth-page/_components/result/wrapper';
import { useAppDispatch } from '@redux/storeSetting';
import { Button, Result } from 'antd';
import { replace } from 'redux-first-history';
import { PATHS } from '@constants/paths';

export const RegisterErrorUserExist = () => {
    const dispatch = useAppDispatch();
    return (
        <Wrapper>
            <Result
                status={'error'}
                title='Данные не сохранились'
                subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                extra={
                    <Button
                        type='primary'
                        size='large'
                        block
                        onClick={() => dispatch(replace(`${PATHS.AUTH}/registration`))}
                        data-test-id='registration-back-button'
                    >
                        Назад к регистрации
                    </Button>
                }
            />
        </Wrapper>
    );
};
