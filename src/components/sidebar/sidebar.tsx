import { Logo } from '@components/UI/logo';
import { Button, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import styles from './sidebar.module.css';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { ExitIcon } from '@public/icons/exit-icon.tsx';
import { useAppDispatch } from '@redux/storeSetting';
import { logout } from '@redux/authSlice';

import { setIsCollapsed } from '@redux/siderSlice';

const { Sider } = Layout;

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const matches = useMediaQuery({ query: `(max-width: 768px)` });
    const [collapsed, setCollapsed] = useState(matches);

    useEffect(() => {
        if (matches) {
            dispatch(setIsCollapsed(true));
            setCollapsed(true);
        }
    }, [matches, dispatch]);

    const menuItems = [
        {
            key: '1',
            icon: <CalendarTwoTone style={{ fontSize: '16px' }} />,
            label: 'Календарь',
        },
        {
            key: '2',
            icon: <HeartFilled style={{ fontSize: '16px' }} />,
            label: 'Тренировки',
        },
        {
            key: '3',
            icon: <TrophyFilled style={{ fontSize: '16px' }} />,
            label: 'Достижения',
        },
        {
            key: '4',
            icon: (
                <IdcardOutlined
                    style={{
                        fontSize: '16px',
                        transform: 'scaleX(0.8)',
                    }}
                />
            ),
            label: 'Профиль',
        },
    ];

    const onCollapse = () => {
        setCollapsed(!collapsed);
        dispatch(setIsCollapsed(!collapsed));
    };

    const onExit = () => {
        dispatch(logout());
    };

    return (
        <Sider
            width={matches ? 106 : 208}
            collapsible
            trigger={null}
            collapsed={collapsed}
            collapsedWidth={matches ? 1 : 64}
            className={styles.sidebar}
        >
            <div className={styles.logo}>
                <Logo collapsed={collapsed} matches={matches} />
            </div>
            {(!matches || !collapsed) && (
                <Menu
                    defaultSelectedKeys={undefined}
                    items={menuItems}
                    mode='inline'
                    inlineIndent={matches ? 0 : 16}
                    className={styles.menu}
                />
            )}

            <div className={styles.toggle_container} data-test-id='sider-switch-mobile'>
                <div className={styles.trapezoid_container}>
                    <div className={styles.trapezoid} />
                </div>
                <Button
                    onClick={onCollapse}
                    type='text'
                    className={styles.toggle_button}
                    data-test-id='sider-switch'
                >
                    {collapsed ? (
                        <MenuUnfoldOutlined style={{ color: '#8C8C8C' }} />
                    ) : (
                        <MenuFoldOutlined style={{ color: '#8C8C8C' }} />
                    )}
                </Button>
            </div>

            <Button type='text' className={styles.exit} size='large' onClick={onExit}>
                {!matches && <ExitIcon />}
                {!collapsed && 'Выход'}
            </Button>
        </Sider>
    );
};
