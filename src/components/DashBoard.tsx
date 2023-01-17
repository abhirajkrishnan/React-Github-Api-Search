import React, { useEffect, useLayoutEffect } from "react";
// import Nav from './Nav'
import Search from "./Search";
import Info from "./Info";
import UserCard from "./UserCard";
import FollowersCard from "./FollowersCard";
import Loading from "./Loading";
import { UseAppSelector, UseAppDispatch } from "./Hooks";
import Language from "./Language";
import Stars from "./Stars";
import MostForkedRepos from "./MostForkedRepos";
import MostPopularRepos from "./MostPopularRepos";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { auth, db } from "../firebase";
import { currentLoggedInUser, searchesByUser } from "../features/currentUser";
import { signOut } from "firebase/auth";

function DashBoard() {
  const dispatch = UseAppDispatch();
  const loading = UseAppSelector((state) => state.loader);
  const isLoggedin = UseAppSelector(
    (state) => state.currentLoggedInUser.isLoggedIn
  );
  const username = UseAppSelector(
    (state) => state.currentLoggedInUser.username
  );
  function signout() {
    const docid = localStorage.getItem("docId");
    if (!!docid) {
      let docRef = doc(db, "users", docid);
      updateDoc(docRef, {
        sessionId: deleteField(),
      }).then(() => {
        console.log("signedout");
      });
    }
    localStorage.removeItem("docId");
    localStorage.removeItem("sessionId");
    dispatch(searchesByUser([]));
    dispatch(
      currentLoggedInUser({
        userinfo: "",
        userId: "",
        isLoggedIn: false,
      })
    );
    signOut(auth)
      .then(() => {
        console.log("signedout");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isLoggedin);
    if (!isLoggedin) navigate("/login");
  }, [isLoggedin]);

  return (
    <main className=" h-full w-full bg-gray-200 relative  ">
      {/* <Nav/>  */}

      <div className="font-bold text-base lg:text-xl flex justify-around">
        Hi, {username}
        <button
          onClick={() => signout()}
          className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 font-bold"
        >
          Logout
        </button>
      </div>
      <Search />
      {!loading && (
        <div>
          <Info />
          <section className="mx-auto p-3 grid grid-cols-2 lg:grid-cols-4 justify-center gap-6 w-full md:w-8/12 lg:w-8/12">
            <UserCard />
            <FollowersCard />
          </section>
          <section className="mx-auto p-3 grid grid-cols-2 lg:grid-cols-7 justify-center gap-3 w-full md:w-8/12 lg:w-8/12">
            <Language />
            <MostPopularRepos />
            <Stars />
            <MostForkedRepos />
          </section>
        </div>
      )}

      {loading && <Loading />}
    </main>
  );
}

export default DashBoard;
