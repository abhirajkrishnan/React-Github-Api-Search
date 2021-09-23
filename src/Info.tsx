import React, { ReactElement } from 'react'
import {FaSearchengin} from 'react-icons/fa'
import {RiGitRepositoryFill} from 'react-icons/ri'
import {BsPeopleFill} from 'react-icons/bs'
import {FiUserPlus} from 'react-icons/fi'
import {GoGist} from 'react-icons/go'
// import data from './mockdata/mockUser'
import {UseAppSelector} from './Hooks'




export default function Info(): ReactElement {
    const data=UseAppSelector(state=>state.user)
    return (
        <section className="mx-auto p-3 grid grid-cols-4 justify-center gap-6 w-full md:w-8/12 lg:w-8/12">
            <article className="info-box"> 
                <span className="text-3xl text-center rounded-full text-pink-500 flex bg-pink-200 w-12 h-12 justify-center items-center ml-5"><RiGitRepositoryFill/></span>
                <div>
                    <h3 className="font-bold text-2xl">{data.public_repos} </h3>
                    <p>Repos</p>
                </div>
            </article> 

            <article className="info-box"> 
                <span className="text-3xl text-center rounded-full text-green-500 flex bg-green-200 w-12 h-12 justify-center items-center  ml-5"><BsPeopleFill/></span>
                <div>
                    <h3 className="font-bold text-2xl">{data.followers} </h3>
                    <p>Followers</p>
                </div>
            </article> 

            <article className="info-box"> 
                <span className="text-3xl text-center rounded-full text-indigo-500 flex bg-indigo-200 w-12 h-12 justify-center items-center  ml-5"><FiUserPlus/></span>
                <div>
                    <h3 className="font-bold text-2xl ">{data.following} </h3>
                    <p>Following</p>
                </div>
            </article> 

            <article className="info-box"> 
                <span className="text-3xl text-center rounded-full text-yellow-500 flex bg-yellow-200 w-12 h-12 justify-center items-center  ml-5"><GoGist/></span>
                <div>
                    <h3 className="font-bold text-2xl">{data.public_gists} </h3>
                    <p>Gists</p>
                </div>
            </article> 

        </section>
    )
}
