import React, { ReactElement } from 'react'
import {VscLoading} from 'react-icons/vsc'

function Loading(): ReactElement {
    return (<>
        <div className="flex items-center justify-center flex-col">

        <VscLoading className=" text-7xl animate-spin text-indigo-700"/>

         <div className="flex items-center justify-center space-x-2 mt-10 gap-5 ">
           <div className="text-3xl italic">Searching</div>
         <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        <div className="w-6 h-6 bg-indigo-400 rounded-full"></div>
        <div className="w-6 h-6 bg-green-400 rounded-full"></div>
        </div>  
    </div>

</div>

</>

    )
}

export default Loading
