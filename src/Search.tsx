import React, { ReactElement,useState,useEffect,Dispatch,SetStateAction,useCallback} from 'react'
import {FaSearchengin} from 'react-icons/fa'
import {useGetgithubUserByNameQuery , useGetFollowersQuery,useReposQuery,useRequestleftQuery  } from './features/fetchuserdata'
import {loading} from './features/loading'
import {currentuser} from './features/data'
import { UseAppDispatch} from './Hooks'
import {Searchuser} from './features/searchuser'
import { followers } from './features/followersdata'
import {repos} from './features/repos'

interface Props {
    searchUserfn:Dispatch<SetStateAction<string>>;
    RequestLeft:number;
    isloading:boolean;
    // currentSearchUser:string;
}
function getLocalStorage(){
    const username:string=window.localStorage.getItem('username') || "wesbos";
    return username;
}

function Search(): ReactElement {
    
    const dispatch= UseAppDispatch()
  
    const [searchUser,setSearchuser]=useState<string>(getLocalStorage())
    // const [RequestLeft,setRequestLeft]=useState<number>(60)

    
    const {data={},isFetching,isSuccess,isError,isLoading}=useGetgithubUserByNameQuery(searchUser)
    const {data:Followers=[],isSuccess:getFollowersSuccess,isFetching:isFollowerFetching}=useGetFollowersQuery(searchUser)
    const {data:reposfetched= [],isSuccess:getReposSuccess,isFetching:isReposFetching}=useReposQuery(searchUser)
   
    const {RequestLeft=60,refetch}=useRequestleftQuery(undefined,{
        selectFromResult: ({ data }) => ({
          RequestLeft: data?.rate?.remaining,
        }),
      })
    
      useEffect(() => {
        if(data && Followers && reposfetched && !isFetching && !isFollowerFetching && !isReposFetching) dispatch(loading(false))
        
     })
  
   
    useEffect(() => {
        dispatch(currentuser(data))
       
    }, [data])

    useEffect(() => {
        dispatch(followers(Followers))
       
    }, [Followers])

    useEffect(() => {
        dispatch(repos(reposfetched))
        refetch()
        dispatch(loading(false))
     
    }, [reposfetched])

   
    return (
        <>
       {isError && <div className="mx-auto pl-3 items-center justify-center gap-2 w-full md:w-8/12 lg:w-8/12 text-red-500 text-sm italic font-semibold">
           User <span className="font-extrabold text-lg mx-1"> { searchUser} </span> Not Found!!</div>} 
         <SearchBox searchUserfn={setSearchuser}  isloading={isLoading} RequestLeft={RequestLeft} />
        </> 
        )
}


function SearchBox({searchUserfn,isloading,RequestLeft}: Props): ReactElement {
    const dispatch= UseAppDispatch()
    const [username,setUsername]=useState<string>(getLocalStorage())
    
    
   

    
    function handlesubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        searchUserfn(username);
        localStorage.setItem("username",username);
        dispatch(Searchuser(username))      
        dispatch(loading(true)) 
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
             
           <input autoFocus className="w-full rounded p-2" type="text" placeholder="Enter Github User Name" value={username} onChange={handleSearchName}/>
            <button type="submit" className={`bg-blue-400 transform hover:scale-110 motion-reduce:transform-none rounded text-white p-1 pl-4 pr-4 ${!RequestLeft?"hidden":"block"}`} >
                <p className="font-semibold text-base ">Search</p>
            </button>
           {!RequestLeft && <p className="border-4 p-1 pr-4 bg-gray-200 mx-auto pl-3 items-center justify-center text-red-500 text-sm italic font-semibold">Request Limit Exceeded !!</p>}
        </form>
        <h3 className=" text-xl lg:text-2xl items-center justify-items-start align-middle text-gray-500 font-mono font-semibold">Requests : {RequestLeft} /60</h3>
        </section>
    )
}

export default Search