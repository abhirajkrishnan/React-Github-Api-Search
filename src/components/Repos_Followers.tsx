import React, {
  useState,
  useEffect,

} from "react";
import { useGetFollowersQuery, useReposQuery } from "../features/fetchuserdata";
import { UseAppDispatch, UseAppSelector } from "./Hooks";
import { loading } from "../features/loading";
import { followers } from "../features/followersdata";
import { repos } from "../features/repos";


function Repos_Followers({userName}:{userName :string}) {
    const dispatch = UseAppDispatch();

  const {
    data: Followers = [],
    isSuccess: getFollowersSuccess,
    isFetching: isFollowerFetching,
  } = useGetFollowersQuery(userName);
  const {
    data: reposfetched = [],
    isSuccess: getReposSuccess,
    isFetching: isReposFetching,
  } = useReposQuery(userName);

  useEffect(() => {
    if (
      Followers &&
      reposfetched &&
      !isFollowerFetching &&
      !isReposFetching
    )
      dispatch(loading(false));
  });


  useEffect(() => {
    dispatch(followers(Followers));
  }, [Followers]);

  useEffect(() => {
    dispatch(repos(reposfetched));
    dispatch(loading(false));
  }, [reposfetched]);

  return <></>;
}

export default Repos_Followers;
