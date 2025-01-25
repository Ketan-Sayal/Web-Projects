/* eslint-disable no-unused-vars */
import React from 'react';
import myLogo from '../assets/logo.png';

function Logo(){
    return(
        <div className='flex space-x-2'>
            <img src={myLogo} alt='Logo' className='w-6 h-6 md:w-8 md:h-8 invert'/>
            <h1 className='text-sm md:text-xl font-bold'>YUKI MOMENTS</h1>
        </div>
    )
}

export default Logo;