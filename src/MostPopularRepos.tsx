import React, { ReactElement,useState,useEffect } from 'react'
import {UseAppSelector} from './Hooks'
import StackedBar from './nivo-charts/StackedBar'
import {poprepo} from './types'


function MostPopularRepos(): ReactElement {
    const Repos=UseAppSelector(state=>state.Repos)

    const [dataset, setdataset] = useState<poprepo[]>([])

    const Popularrepos:poprepo[]=Repos.map((item)=>({ reponame:item.name,stars:item.stargazers_count})).sort((a,b)=>b.stars-a.stars).slice(0,5)
    console.log("Popular Oness",Popularrepos)

    useEffect(() => {
        setdataset(Popularrepos)
    }, [Repos])

    return (
        <article  className="bg-white col-span-2 lg:col-span-4 h-96 md:h-96 p-1 flex flex-col shadow-xl rounded-lg">
        <h3 className="flex justify-center text-sm lg:text-2xl font-bold">Most Popular</h3>
        <StackedBar data={dataset}/>
    </article>
    )
}

export default MostPopularRepos
