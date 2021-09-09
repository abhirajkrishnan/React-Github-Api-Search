import React, { ReactElement } from 'react'
import Follower from './mockdata/mockFollower'

interface Props {
    
}

function FollowersCard({}: Props): ReactElement {
    return (
        <article  className="bg-white col-span-2 p-5 flex flex-col">
            <h3 className="flex justify-center text-sm lg:text-2xl font-bold">Followers</h3>
            <div className="flex flex-col h-56 overflow-scroll">
            {Follower.map(user=>{
                return(
                    <article className="flex items-center p-2">
                    <img src={user.avatar_url} alt="" className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover"/>
                    <div className="pl-6 flex-col flex ">
                        <p className="text-sm lg:text-base font-bold">{user.login}</p>
                        <a href={user.html_url} className="text-sm lg:text-base font-semibold text-gray-600">{user.html_url}</a>
                    </div>
                </article>
                )
            })}
               

            </div>
        </article>
    )
}

export default FollowersCard