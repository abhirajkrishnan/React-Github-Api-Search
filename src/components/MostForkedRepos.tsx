import React, { ReactElement,useState,useEffect } from 'react'
import {UseAppSelector} from './Hooks'
import HorizontalBar from '../nivo-charts/Horizontalbar'
import { Forkrepo} from './types'


function MostForkedRepos(): ReactElement {
    const Repos=UseAppSelector(state=>state.Repos)

    const [dataset, setdataset] = useState<Forkrepo[]>([])

   const Forkedrepos:Forkrepo[]=Repos.map((item)=>({ reponame:item.name,fork:item.forks_count})).sort((a,b)=>b.fork-a.fork).slice(0,5)
    
    console.log("Forks",Forkedrepos)
    useEffect(() => {
        setdataset(Forkedrepos)
    }, [Repos])

    return (
        <article  className="bg-white col-span-2 lg:col-span-4 h-96 md:h-96 p-1 flex flex-col shadow-xl rounded-lg">
        <h3 className="flex justify-center text-xl lg:text-2xl font-bold">Most Forked Repos</h3>
        <HorizontalBar datas={dataset}/>
    </article>
    )
}

export default MostForkedRepos
