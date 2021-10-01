import React, { ReactElement } from 'react'
import {Piechart} from './nivo-charts/Piechart'
import {dataset} from './nivo-charts/dataset'

interface Props {
    
}

function Language({}: Props): ReactElement {
    return (
        <article className="bg-white col-span-2 p-1 h-96 md:h-96 flex flex-col shadow-xl rounded-lg">
            <p className="flex justify-center items-center text-xl font-semibold">Languages</p>
            <Piechart data={dataset}/>
        </article>
    )
}

export default Language
