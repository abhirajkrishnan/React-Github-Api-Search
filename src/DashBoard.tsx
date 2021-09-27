import React from 'react';
import Nav from './Nav'
import './index.css';
import Search from './Search'
import Info from './Info'
import UserCard from './UserCard'
import FollowersCard from './FollowersCard'
import Loading from './Loading';
import {UseAppSelector} from './Hooks'

function DashBoard() {
  
  const loading=UseAppSelector(state=>state.loader)
//  console.log(loading)
  return (
    <main className=" h-screen w-screen bg-gray-200">
      <Nav/> 
     
        <Search/>
        { !loading &&
        <div>
        <Info/>
        <section className="mx-auto p-3 grid grid-cols-2 lg:grid-cols-4 justify-center gap-6 w-full md:w-8/12 lg:w-8/12">
          <UserCard/>
          <FollowersCard/>
        </section>
        </div>}

        {loading && <Loading/>} 
        )

      
    </main>
  );
}

export default DashBoard;
