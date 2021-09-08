import React, { ReactElement } from 'react'
import {FaSearchengin} from 'react-icons/fa'

interface Props {
    
}

function Search({}: Props): ReactElement {
    return (
        <section className="mx-auto p-3 grid lg:grid-cols-4 grid-cols-3 items-center justify-center gap-2 w-full md:w-8/12 lg:w-8/12">
            <div className="bg-white shadow flex w-full col-span-3">
            <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className=" text-3xl"><FaSearchengin/></i>
             </span>
           <input className="w-full rounded p-2" type="text" placeholder="Enter Github User Name"/>
            <button type="submit" className="bg-blue-400 hover:bg-blue-700 rounded text-white p-1 pl-4 pr-4">
                <p className="font-semibold text-base ">Search</p>
            </button>
        </div>
        <h3 className=" text-xl lg:text-2xl items-center justify-items-start align-middle text-gray-500 font-mono font-semibold">Requests : 50 /60</h3>
        </section>
    )
}

export default Search
