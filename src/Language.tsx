import React, { ReactElement,useState ,useEffect} from 'react'
import {Piechart} from './nivo-charts/Piechart'
import {UseAppSelector} from './Hooks'
import {datasetType,reduced,obj} from './types'


function Language(): ReactElement {
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

    const mostUsed:datasetType[]=Object.values(repoinfo).sort((a,b)=>b.value-a.value).slice(0,5)

        function percentage(data:datasetType[]): datasetType[] {
            let total=0;
            data.forEach(element => {
              total=element.value+total;
            });
            
            let mapped=data.map((item)=>{
              item.value=Number(((item.value/total)*100).toFixed(1))
              return {...item}
            })
            return mapped;
          }
          
        useEffect(() => {
            setdataset(percentage(mostUsed))
        },[repos])

    return (
        <article className="bg-white col-span-2 lg:col-span-3 p-1 h-96 md:h-96 flex flex-col shadow-xl rounded-lg">
            <p className="flex justify-center items-center text-xl lg:text-2xl font-semibold">Most Used Languages</p>
            <Piechart data={dataset}/>
        </article>
    )
}

export default Language
