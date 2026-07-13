import React from 'react'

const NavBar = () => {
    return (
        <nav className="flex py-2 justify-between bg-blue-300 text-amber-600">
            <div className="logo">
                <span className='font-bold mx-3'>iTask</span>
            </div>
            <ul className="flex gap-16 mx-9">
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
            </ul>



        </nav>
    )
}

export default NavBar