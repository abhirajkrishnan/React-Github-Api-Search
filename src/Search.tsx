import React, { ReactElement,useState,useEffect,useCallback,Dispatch,SetStateAction} from 'react'
import {FaSearchengin} from 'react-icons/fa'
import {useGetgithubUserByNameQuery,useGetFollowersQuery} from './features/fetchuserdata'
import {loading} from './features/loading'
import {currentuser} from './features/data'
import mockFollower from './mockdata/mockFollower'
import { UseAppDispatch} from './Hooks'
import {UseAppSelector} from './Hooks'
import {Searchuser} from './features/searchuser'
import { followers } from './features/followersdata'
import {FollowersType} from './types'

interface Props {
    searchUserfn:Dispatch<SetStateAction<string>>;
    fetchagain:() => void;
    isloading:boolean;
    // followersdata:FollowersType;
}


function Search(): ReactElement {
    const loader=UseAppSelector(state=>state.loader)
    const dispatch= UseAppDispatch()
    const [searchUser,setSearchuser]=useState<string>("hnasr")
    const {data={},isFetching,refetch,isError,isLoading}=useGetgithubUserByNameQuery(searchUser)
    const {data:Followers=[],isFetching:isFollowerFetching}=useGetFollowersQuery(searchUser)
    // console.log(isError)

    useEffect(() => {
     if(data && Followers && !isFollowerFetching && !isFetching ) {
           if(isError) dispatch(loading(false))
           else {
            dispatch(currentuser(data))
            dispatch(followers(Followers))
            dispatch(loading(isFetching))
           }
            }
    }, [data,isFollowerFetching,Followers,isFetching,isError])
        
    return (
        <>
       {isError && <div className="mx-auto pl-3 items-center justify-center gap-2 w-full md:w-8/12 lg:w-8/12 text-red-500 text-sm italic font-semibold">
           User <span className="font-extrabold text-lg mx-1"> { searchUser} </span> Not Found!!</div>} 
         <SearchBox searchUserfn={setSearchuser} fetchagain={refetch} isloading={isLoading} />
        </> 
        )
}


function SearchBox({searchUserfn,fetchagain,isloading}: Props): ReactElement {
    const dispatch= UseAppDispatch()
    const [username,setUsername]=useState<string>("")
    
    
    function handlesubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        searchUserfn(username);
        dispatch(Searchuser(username))
        fetchagain()
        dispatch(loading(!isloading))
        
    }
     
    function handleSearchName(e:React.FormEvent<HTMLInputElement>){
        setUsername(e.currentTarget.value)
        
    }   
  
    
    return (
        <section className="mx-auto p-3 grid lg:grid-cols-4 grid-cols-3 items-center justify-center gap-2 w-full md:w-8/12 lg:w-8/12">
            
            <form className="bg-white shadow flex w-full col-span-3" onSubmit={handlesubmit}>
            <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className=" text-3xl"><FaSearchengin/></i>
             </span>
             
           <input className="w-full rounded p-2" type="text" placeholder="Enter Github User Name" value={username} onChange={handleSearchName}/>
            <button type="submit" className="bg-blue-400 hover:bg-blue-700 rounded text-white p-1 pl-4 pr-4" >
                <p className="font-semibold text-base ">Search</p>
            </button>
           
        </form>
        <h3 className=" text-xl lg:text-2xl items-center justify-items-start align-middle text-gray-500 font-mono font-semibold">Requests : 50 /60</h3>
        </section>
    )
}


export default Search
