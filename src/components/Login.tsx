import React, { ReactElement, useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import img from "./github.jpg";
import { UseAppDispatch, UseAppSelector } from "./Hooks";
import { currentLoggedInUser, searchesByUser } from "../features/currentUser";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface Props {}
const provider = new GoogleAuthProvider();

function Login({}: Props): ReactElement {
  const dispatch = UseAppDispatch();
  const userdetails = UseAppSelector((state) => state.currentLoggedInUser);
  const isLoggedin = UseAppSelector(
    (state) => state.currentLoggedInUser.isLoggedIn
  );
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState({
    displayName: "",
    uid: "",
    searches: [],
  });
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
  async function signin() {
    try {
      await signInWithRedirect(auth, provider);
      const res: any = await getRedirectResult(auth);
      console.log("RESULT", res);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      const searchdocRef = doc(db, "searches", user.uid);
      const searchesdocs = await getDoc(searchdocRef);
      if (searchesdocs.exists()) {
        console.log(searchesdocs.data().searchedByUser);
        setUserinfo({
          ...userinfo,
          displayName: user.displayName || "",
          uid: user.uid,
          searches: searchesdocs.data().searchedByUser,
        });
      } else {
        setDoc(searchdocRef, { searchedByUser: [] });
        setUserinfo({
          ...userinfo,
          displayName: user.displayName || "",
          uid: user.uid,
          searches: [],
        });
      }
      if (docs.docs.length === 0) {
        let sessionId = uuidv4();
        localStorage.setItem("sessionId", sessionId);
        let ref = await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          sessionId,
        });
        localStorage.setItem("docId", ref.id);
      } else {
        let sessionId = uuidv4();
        localStorage.setItem("docId", docs.docs[0].id);
        const docid = localStorage.getItem("docId");
        if (!!docid) {
          let docRef = doc(db, "users", docid);
          updateDoc(docRef, {
            sessionId: sessionId,
          }).then(() => {
            localStorage.setItem("sessionId", sessionId);
          });
        }
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }
  // async function signin() {
  //   await signInWithRedirect(auth, provider);
  // }
  // useEffect(() => { https://github.com/firebase/firebase-js-sdk/issues/3115
  //   getRedirectResult(auth).then((result) => {
  //     console.log("RESULT", result);
  //     if (result) {
  //       console.log("RESULT", result);
  //       const user = result.user;
  //       const q = query(collection(db, "users"), where("uid", "==", user.uid));
  //       getDocs(q).then((docs) => {
  //         if (docs.docs.length === 0) {
  //           let sessionId = uuidv4();
  //           localStorage.setItem("sessionId", sessionId);
  //           addDoc(collection(db, "users"), {
  //             uid: user.uid,
  //             name: user.displayName,
  //             authProvider: "google",
  //             email: user.email,
  //             sessionId,
  //           }).then((ref) => {
  //             localStorage.setItem("docId", ref.id);
  //           });
  //         } else {
  //           let sessionId = uuidv4();
  //           localStorage.setItem("docId", docs.docs[0].id);
  //           const docid = localStorage.getItem("docId");
  //           if (!!docid) {
  //             let docRef = doc(db, "users", docid);
  //             updateDoc(docRef, {
  //               sessionId: sessionId,
  //             }).then(() => {
  //               localStorage.setItem("sessionId", sessionId);
  //             });
  //           }
  //         }
  //       });
  //       const searchdocRef = doc(db, "searches", user.uid);
  //       getDoc(searchdocRef).then((searchesdocs) => {
  //         if (searchesdocs.exists()) {
  //           console.log(searchesdocs.data().searchedByUser);
  //           setUserinfo({
  //             ...userinfo,
  //             displayName: user.displayName || "",
  //             uid: user.uid,
  //             searches: searchesdocs.data().searchedByUser,
  //           });
  //         } else {
  //           setDoc(searchdocRef, { searchedByUser: [] });
  //           setUserinfo({
  //             ...userinfo,
  //             displayName: user.displayName || "",
  //             uid: user.uid,
  //             searches: [],
  //           });
  //         }
  //       });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    let login = false;
    if (userinfo.uid.length > 0) login = true;
    dispatch(
      currentLoggedInUser({
        userinfo: userinfo.displayName,
        userId: userinfo.uid,
        isLoggedIn: login,
        searches: userinfo.searches,
      })
    );
  }, [userinfo]);

  useEffect(() => {
    //if user found from sessionid
    try {
      let session = localStorage.getItem("sessionId");
      if (session && session.length > 0) {
        const q = query(
          collection(db, "users"),
          where("sessionId", "==", session)
        );
        getDocs(q).then((data) => {
          if (data.docs.length > 0) {
            getDoc(doc(db, "searches", data.docs[0].data().uid)).then(
              (search) => {
                if (search.data()) {
                  dispatch(
                    currentLoggedInUser({
                      userinfo: data.docs[0].data().name,
                      userId: data.docs[0].data().uid,
                      isLoggedIn: true,
                      searches: search.data()?.searchedByUser,
                    })
                  );
                } else {
                  dispatch(
                    currentLoggedInUser({
                      userinfo: data.docs[0].data().name,
                      userId: data.docs[0].data().uid,
                      isLoggedIn: true,
                      searches: [],
                    })
                  );
                }
              }
            );
          }
        });
      }
    } catch (err) {
      alert(err);
    }
  }, []);
  useEffect(() => {
    if (isLoggedin) navigate("/dashboard");
  }, [isLoggedin]);
  console.log(userdetails);

  return (
    <>
      <section className="h-full gradient-form bg-gray-200 md:h-screen flex justify-center">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <img className="mx-auto w-48" src={img} alt="logo" />
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                          Login To view Github Users Stats
                        </h4>
                      </div>
                      <form className="flex justify-center flex-col">
                        <p className="mb-4">Please login to your account</p>
                        <button
                          type="button"
                          className=" flex justify-center text-black bg-yellow-400 hover:bg-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2"
                          onClick={signin}
                        >
                          <svg
                            className="w-4 h-4 mr-2 -ml-1"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                          >
                            <path
                              fill="currentColor"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                          </svg>
                          Sign in with Google
                        </button>
                        <button
                          type="button"
                          onClick={signout}
                          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 font-bold"
                        >
                          Log Out
                        </button>
                      </form>
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-xl font-semibold mb-6">
                        Github Search API
                      </h4>
                      <p className="text-sm">
                        Search For your Favourite Github users and see their
                        Stats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
