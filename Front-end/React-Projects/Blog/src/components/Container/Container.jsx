// only for those components that need header and footer i.e main components
import React from "react";
import {Header, Footer} from '../index';
import './Container.css'

function Container({
    children,
    className='',
}) {
    return (
        <div className="container w-full min-h-screen">
            <div className='relative innerContainer w-[100vw] h-[90%]'><Header /></div>
            <main className={`${className} w-screen p-1 md:px-8`}>{children}</main>
            <div  className='w-screen'><Footer/></div>
        </div>
    )
}

export default Container;