import { Menu, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        message.success("Logout Successful");
        navigate("/login")

    };


    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <div className="menu-header">
                AutoRecruitment
            </div>
            {isLoggedIn && (
                <div style={{ marginLeft: 'auto' }}>
                    <Menu.Item key="candidate-jobs">
                        <a href="/jobs">jobs</a>
                    </Menu.Item>

                    <Menu.Item key="candidate-jobs">
                        <a href="/admin/jobs">Admin</a>
                    </Menu.Item>
                    <Menu.Item key="auth">
                        <a onClick={handleLogout}>
                            Logout
                        </a>
                    </Menu.Item>
                </ div>
            )}

            {!isLoggedIn && (
                <div style={{ marginLeft: 'auto' }}>
                    <Menu.Item key="auth">
                        <a href="/login">Login</a>
                    </Menu.Item>
                </ div>
            )}

        </Menu>
    );
};

export default NavBar;
