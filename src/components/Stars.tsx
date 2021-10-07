import React, { ReactElement,useState ,useEffect} from 'react'
import {Doughnut} from '../nivo-charts/Doughnut'
import {UseAppSelector} from './Hooks'
import {datasetType,reduced,obj} from './types'


function Stars(): ReactElement {
    const repos=UseAppSelector(state=>state.Repos)

    const [dataset, setdataset] = useState<datasetType[]>([])

    
        const repoinfo=repos.reduce(
            function (total:reduced,item):reduced {
            const language:string|null=item.language;
            const stargazers_count=item.stargazers_count
            if(typeof language === null)
            {
                return total;
            } 
            else if(typeof language === "string")
            {
                if (!total[language])
                {
                    total[language]={id:language,label:language,value:1,stars:stargazers_count};
                }   //value is nos. of repos
                else {
                    total[language]={...total[language] , value:total[language].value+1 , stars:total[language].stars+stargazers_count}
                }
               
            }
             return total;
        },{} as obj)

    const mostStars:datasetType[]=Object.values(repoinfo).sort((a,b)=>b.stars-a.stars).slice(0,5).map(item=>({...item,value:item.stars}))

         
        useEffect(() => {
            setdataset(mostStars)
        },[repos])

    return (
        <article className="bg-white col-span-2 lg:col-span-3 p-1 h-96 md:h-96 flex flex-col shadow-xl rounded-lg">
            <p className="flex justify-center items-center text-xl lg:text-2xl font-semibold">Most Starred Languages</p>
            <Doughnut data={dataset}/>
        </article>
    )
}

export default Stars
