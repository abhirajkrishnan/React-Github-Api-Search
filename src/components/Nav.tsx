import React from 'react'

function Nav() {
    return (
        <nav className="bg-white text-center grid justify-center items-center grid-flow-col gap-x-7 p-6 mb-16">
         {/* <img src="https://lh3.googleusercontent.com/a/AATXAJyh5cWAxmgVjgtMTMiSE31T_VfBrSJh1YtRhxtC=s96-c" className="h-10 rounded-full object-cover w-10" alt=""/>
         <h4>Welcome,  <strong>Abhiraj</strong></h4>
         <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Logout</button> */}
        <h1 className="text-4xl lg:text-6xl underline leading-normal mt-0 mb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-green-700">
          Search Github Users And See Stats
        </h1>

        </nav>
    )
}

export default Nav
