import React, { ReactElement } from 'react'
import {Piechart} from './nivo-charts/Piechart'
import {dataset} from './nivo-charts/dataset'

interface Props {
    
}

function Language({}: Props): ReactElement {
    return (
        <article className="bg-white col-span-2 p-2 md:h-96 flex flex-col shadow-xl rounded-lg">
            <Piechart data={dataset}/>
        </article>
    )
}

export default Language
