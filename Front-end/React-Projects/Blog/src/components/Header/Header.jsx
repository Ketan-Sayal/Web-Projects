import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Logo, Input, LogoutBtn } from '../index'

function Header() {

    const navigate = useNavigate();

    const authStatus = useSelector(state => state.auth.status);
    // console.log(authStatus);
    let headerItems = [
        {
            label: 'Home',
            path: '/',
            active: true,
        },
        {
            label: 'Login',
            path: '/login',
            active: !authStatus,
        },
        {
            label: 'Signup',
            path: '/signup',
            active: !authStatus,
        },
        {
            label: 'All Posts',
            path: '/all-posts',
            active: authStatus,
        },
        {
            label: 'Create Post',
            path: '/create-post',
            active: authStatus,
        },
    ]

    return (
        <div id='header' className='xl:bg-bottom text-white'>
            <div className="flex justify-between text-sm md:text-base items-center md:p-4 text-white">
                <nav className='w-full'>
                    <ul className='flex flex-wrap md:pt-5 w-full space-x-1 md:space-x-4'>
                        <li className='px-2 py-[1px]'><Logo /></li>
                        
                        {headerItems.map((item, index) => (
                            item.active ? (<li key={index} className={`font-bold`}>
                                <button className='px-2 py-1 text-xs md:text-base rounded-lg hover:bg-white hover:text-black duration-200 transition-all'
                                    onClick={() => navigate(item.path)}
                                >{item.label}</button>
                            </li>) : null
                        ))}
                        {authStatus && <li><LogoutBtn /></li>}
                    </ul>
                </nav>
            </div>
            <div className='py-16 w-full flex flex-col space-y-4 justify-center items-center'>
                <h1 className='text-lg md:text-4xl font-bold'>Welcome to Yuki Moments!</h1>
                <p className='text-md md:text-2xl font-semibold'>Discover and share your favorite moments</p>
                <p className='text-base md:text-xl text-justify font-extrabold w-[60%]'>At Yuki Moments, we believe in the beauty of capturing life's fleeting inspirations, thoughts, and experiences. This is a space where stories come alive, ideas take shape, and connections are forged. Whether you're here for insightful articles, personal reflections, or creative musings, Yuki Moments is your go-to destination for authentic and engaging content. Join us as we explore the moments that make life extraordinary.</p>
            </div>
        </div>
    )
}

export default Header;