import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import logo from './login-img.svg'

interface Props {
    
}

function Home({}: Props): ReactElement {
    return (
        <>
         <main className="flex justify-center items-center flex-col my-auto h-screen w-screen bg-gradient-to-br from-gray-800 via-black to-black " >
            <div className="lg:w-2/5 w-screen mb-10 ">
                 <img src={logo} alt="" className="text-green-400"/>
            </div>
        <div className="relative group">
        <div className="absolute bg-gradient-to-r from-green-900 via-green-400 to-blue-500 opacity-75 group-hover:opacity-100 -inset-0.5 rounded-lg filter blur-sm"></div>
        <Link to="/Login">
        <button className="rounded-lg relative bg-black text-white  font-semibold italic tracking-wider px-6 py-3 m-1 ">
            Login / Sign-Up
         </button>
         </Link>
         </div>
         </main> 
         

        </>
    )
}

export default Home
