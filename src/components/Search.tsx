import React, {
  ReactElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { FaSearchengin, FaRegTimesCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import {
  useGetgithubUserByNameQuery,
  useRequestleftQuery,
} from "../features/fetchuserdata";
import { loading } from "../features/loading";
import { currentuser } from "../features/data";
import { UseAppDispatch, UseAppSelector } from "./Hooks";
import { Searchuser } from "../features/searchuser";
import { searchesByUser } from "../features/currentUser";
import Repos_Followers from "./Repos_Followers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  searchUserfn: Dispatch<SetStateAction<string>>;
  RequestLeft: number;
  isloading: boolean;
  // currentSearchUser:string;
}
function getLocalStorage() {
  const username: string = window.localStorage.getItem("username") || "wesbos";
  return username;
}

function Search(): ReactElement {
  const dispatch = UseAppDispatch();
  const searches = UseAppSelector(
    (state) => state.currentLoggedInUser.searches
  );
  const uid = UseAppSelector((state) => state.currentLoggedInUser.userId);
  const [searchUser, setSearchuser] = useState<string>(getLocalStorage());
  // const [RequestLeft,setRequestLeft]=useState<number>(60)
  // const [userfetchresult, setuserfetchresult] = useState(false);
  const {
    data = {},
    isFetching,
    isSuccess,
    isError,
    status,
    isLoading,
  } = useGetgithubUserByNameQuery(searchUser);
  if (isSuccess) localStorage.setItem("username", searchUser);

  const { RequestLeft = 60, refetch } = useRequestleftQuery(undefined, {
    selectFromResult: ({ data }) => ({
      RequestLeft: data?.rate?.remaining,
    }),
  });

  useEffect(() => {
    if (status == "rejected" && !isSuccess && isError) {
      dispatch(loading(false));
    }
  }, [status]);

  useEffect(() => {
    dispatch(currentuser(data));
    refetch();
  }, [data]);

  return (
    <>
      {isError && (
        <div className="mx-auto pl-3 items-center justify-center gap-2 w-full md:w-8/12 lg:w-8/12 text-red-500 text-sm italic font-semibold">
          User{" "}
          <span className="font-extrabold text-lg mx-1"> {searchUser} </span>{" "}
          Not Found!!
        </div>
      )}
      {status != "rejected" && status != "pending" && isSuccess && !isError && (
        <Repos_Followers userName={searchUser} />
      )}
      <SearchBox
        searchUserfn={setSearchuser}
        isloading={isLoading}
        RequestLeft={RequestLeft}
      />
    </>
  );
}

function SearchBox({
  searchUserfn,
  isloading,
  RequestLeft,
}: Props): ReactElement {
  const dispatch = UseAppDispatch();
  const [username, setUsername] = useState<string>(getLocalStorage());
  const [searchFocused, setsearchFocused] = useState(false);
  const [suggestionsFocused, setsuggestionsFocused] = useState(false);
  const searches = UseAppSelector(
    (state) => state.currentLoggedInUser.searches
  );
  const uid = UseAppSelector((state) => state.currentLoggedInUser.userId);

  function deleteSearch(name: string) {
    let newSearchArr = searches.filter((e) => e.name != name);
    const searchRef = doc(db, "searches", uid);
    updateDoc(searchRef, {
      searchedByUser: newSearchArr.slice(0, 7),
    });
    dispatch(searchesByUser(newSearchArr));
  }
  function addInSearch(name: string) {
    let searched = [...searches];
    searched.push({ name: name, timeStamp: new Date().getTime() });
    searched.sort((a, b) => a.timeStamp - b.timeStamp);
    let obj: any = {};
    searched.forEach((el) => {
      obj[el.name] = el;
    });
    let arr = [];
    for (let k in obj) arr.push(obj[k]);
    const searchRef = doc(db, "searches", uid);
    updateDoc(searchRef, {
      searchedByUser: arr.slice(0, 7),
    });
    dispatch(searchesByUser(arr.slice(0, 7)));
  }

  function handlesubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchUserfn(username);
    addInSearch(username);
    dispatch(Searchuser(username));
    dispatch(loading(true));
  }

  function handleSearchName(e: React.FormEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }
  console.log(searchFocused, suggestionsFocused);
  return (
    <>
      <section
        className="mx-auto p-3 grid lg:grid-cols-5 grid-cols-4 items-center justify-center gap-x-2 w-full md:w-8/12 lg:w-8/12 "
        onFocus={() => {
          setsearchFocused(true);
          setsuggestionsFocused(true);
        }}
        onBlur={() => {
          if (!suggestionsFocused) {
            setsearchFocused(false);
          }
        }}
      >
        <form
          className="bg-white shadow flex w-full col-span-3"
          onSubmit={handlesubmit}
        >
          <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className=" text-3xl">
              <FaSearchengin />
            </i>
          </span>

          <input
            className="w-full rounded p-2"
            type="text"
            placeholder="Enter Github User Name"
            value={username}
            onChange={handleSearchName}
          />
          <button
            type="submit"
            className={`bg-blue-400 transform hover:scale-110 motion-reduce:transform-none rounded text-white p-1 pl-4 pr-4 ${
              !RequestLeft ? "hidden" : "block"
            }`}
          >
            <p className="font-semibold text-base ">Search</p>
          </button>
          {!RequestLeft && (
            <p className="border-4 p-1 pr-4 bg-gray-200 mx-auto pl-3 items-center justify-center text-red-500 text-sm italic font-semibold">
              Request Limit Exceeded !!
            </p>
          )}
        </form>
        <h3 className=" text-sm lg:text-2xl col-span-2  items-center justify-items-start align-middle text-gray-500 font-mono font-semibold absolute left-72 lg:left-2/3 md:left-2/3">
          Requests : {RequestLeft} /60
        </h3>

        <div className="col-start-1 col-end-4 relative z-10">
          <div
            className="absolute w-full"
            tabIndex={1}
            onTouchMove={() => {
              console.log("touchg");
            }}
            onFocus={() => {
              {
                setsuggestionsFocused(true);
              }
            }}
            onMouseEnter={() => {
              setsuggestionsFocused(true);
            }}
            onMouseLeave={() => {
              setsuggestionsFocused(false);
            }}
            onBlur={() => {
              {
                setsuggestionsFocused(false);
              }
            }}
          >
            {searches.length > 0 &&
              searchFocused &&
              searches.map((item, index) => {
                return (
                  <PastSearches
                    name={item.name}
                    key={index}
                    fn={deleteSearch}
                  />
                );
              })}
          </div>
        </div>
        <div className="col-span-2"></div>
      </section>
    </>
  );
}

function PastSearches({
  name,
  fn,
}: {
  name: string;
  fn: (name: string) => void;
}) {
  function getName(e: any) {
    let deleteName = e.currentTarget.parentElement.children[1].textContent;
    fn(deleteName);
  }
  return (
    <div className=" bg-white flex justify-center items-center w-full border-b-2 border-black  border-l-2 border-r-2 col-span-3 flex ">
      <div className="px-3">
        <BiTimeFive />
      </div>
      <div className=" bg-white font-medium text-lg w-full">{name}</div>
      <button className="px-3 text-red-700" onClick={(e) => getName(e)}>
        <FaRegTimesCircle />
      </button>
    </div>
  );
}
export default Search;
