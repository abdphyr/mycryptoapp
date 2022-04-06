import React from 'react';
import { Button, Typography, Avatar, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../images/logo.jpg';


const Navbar:React.FC = () => {
    const [activeMenu, setActiveMenu] = useState(false)
    const [screenSize, setScreenSize] = useState<number>(0)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize < 800) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <a href='https://abdlendingpage.netlify.app' target="_blank"><Avatar src={logo} size="large" /></a>
                <Typography.Title level={3} className="logo" >
                    <Link className='logoBtn' to="/">Cryptoverse</Link>
                </Typography.Title >
                <Button onClick={() => setActiveMenu(!activeMenu)} className='menu-control-container'>
                    <MenuOutlined className='menuBtn' />
                </Button>
            </div>
            <div>
                {activeMenu && (
                    <Menu theme='dark'>
                        <Menu.Item icon={<HomeOutlined />} >
                            <Link to='/'>Home</Link>
                        </Menu.Item>
                        <Menu.Item icon={<FundOutlined />} >
                            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BulbOutlined />} >
                            <Link to='/news'>News</Link>
                        </Menu.Item>
                    </Menu>
                )}
            </div>
        </div>
    );
};

export default Navbar;