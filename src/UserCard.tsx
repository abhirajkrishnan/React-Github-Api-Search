import React, { ReactElement } from 'react'
import {GoLink} from 'react-icons/go'
import {FaTwitter,FaLinkedin} from 'react-icons/fa'
import {CgOrganisation} from 'react-icons/cg'
import {UseAppSelector} from './Hooks'


function UserCard(): ReactElement {

    const data=UseAppSelector(state=>state.user)

    return (
        <article className="bg-white col-span-2 p-5 flex flex-col shadow-xl rounded-lg">
            <h3 className="flex justify-center text-sm lg:text-2xl font-bold">User</h3>
            <header className="grid grid-cols-5 justify-center items-center p-4"> 
                <img src={data.avatar_url} alt="" className="w-12 h-12 lg:w-20 lg:h-20 rounded-full object-cover"/>
                <div className="pl-5  col-span-3 ">
                    <h2 className="block text-lg font-medium lg:font-semibold">{data.name}</h2>
                   {data.twitter_username&& <p className="block">@{data.twitter_username}</p>}
                </div>
                <button className="flex items-center justify-center shadow border-blue-500 border-2 rounded-full px-2 lg:px-4 lg:py-2 text-blue-500 hover:bg-blue-500 hover:text-white">
                    <a href={data.html_url} rel="noreferrer" target="_blank">Follow </a>
                </button>
            </header>
            <p className="font-semibold text-base lg:text-lg">{data.bio}</p>
            <ul className="flex flex-col justify-center pt-3">
                {data.blog&&<li><a href={`https://${data.blog}`}><GoLink className="inline"/><span className="pl-3 text-blue-800 hover:underline">{data.blog}</span></a></li>}

                {data.twitter_username&&<li><a href={`https://twitter.com/${data.twitter_username}`}><FaTwitter className="inline text-blue-500"/><span className="pl-3 text-blue-900 hover:underline">{data.twitter_username}</span></a></li>}

                {data.company&&<li><CgOrganisation className="inline"/><span className="pl-3">{data.company}</span></li>}
            </ul>
        </article>
    )
}

export default UserCard
