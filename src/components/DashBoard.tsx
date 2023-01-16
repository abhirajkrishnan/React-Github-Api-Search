import React from 'react';
// import Nav from './Nav'
import Search from './Search'
import Info from './Info'
import UserCard from './UserCard'
import FollowersCard from './FollowersCard'
import Loading from './Loading';
import {UseAppSelector} from './Hooks'
import Language from './Language';
import Stars from './Stars';
import MostForkedRepos from './MostForkedRepos';
import MostPopularRepos from './MostPopularRepos';

function DashBoard() {
  
  const loading=UseAppSelector(state=>state.loader)
  return (
    <main className=" h-full w-full bg-gray-200  ">
      {/* <Nav/>  */}
      <p className='font-bold text-base lg:text-xl flex justify-center'>Hi , Abhi</p>
        <Search/>
        { !loading &&
        <div>
        <Info/>
        <section className="mx-auto p-3 grid grid-cols-2 lg:grid-cols-4 justify-center gap-6 w-full md:w-8/12 lg:w-8/12">
          <UserCard/>
          <FollowersCard/>
        </section>
        <section className="mx-auto p-3 grid grid-cols-2 lg:grid-cols-7 justify-center gap-3 w-full md:w-8/12 lg:w-8/12">
          <Language/>
          <MostPopularRepos/>
          <Stars/>
          <MostForkedRepos/>
        </section>
        </div>}

        {loading && <Loading/>} 
        

      
    </main>
  );
}

export default DashBoard;
