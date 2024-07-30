import { useState, useRef } from "react";
import Header from "./Header";
import { validation } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_BG_IMAGE } from "../utils/constant";

const Login = ()=> {
    const [toggleSignUpForm, setToggleSignUpForm]= useState(true);
    const [errorMessage, setErrorMessage]= useState(null)
    const dispatch = useDispatch()


    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null)

    const handleClickButton = ()=>{
        //validation
        const message = validation(email.current.value, password.current.value)
        setErrorMessage(message)

        if(message) return;

        if(!toggleSignUpForm){
            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value )
            .then((userCredential)=>{
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value
                }).then(()=>{
                    const {uid, email, displayName} = auth;
                    dispatch(addUser({uid:uid, email:email, displayName:displayName}));

                }).catch(()=>{
                    console.log(errorMessage)
                })
                
                console.log(user)
            }).catch((error)=>{
                const errorCode = error.message
                setErrorMessage(errorCode)

            });


        }
        else{
            // sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.message;
                setErrorMessage(errorCode)
            });


        }

    }
    const toggleSignUpIn = ()=>{
        setToggleSignUpForm(!toggleSignUpForm)
    }
    return(
        <div>
            <Header/>
            <div className="absolute">
                <img alt="bg-image" src={NETFLIX_BG_IMAGE}/>
            </div>
            <form onSubmit={(e)=> e.preventDefault()} className="w-3/12 absolute p-6  bg-black mx-auto left-0 right-0 my-36 text-white rounded-lg bg-opacity-80">
                <h1 className="text-white font-bold text-3xl p-2 m-2">{toggleSignUpForm ? "Sign In" : "Sign Up"}</h1>
                {!toggleSignUpForm && <input ref={name} type="text" placeholder="Username" className="p-3 my-3 w-full outline-none bg-gray-700 bg-opacity-50" />}
                <input ref={email} type="text" placeholder="Email or Phone Number" className="p-3 my-3 w-full outline-none bg-gray-700 bg-opacity-50" />
                <input ref={password}type="password" placeholder="Password" className="p-3 my-3 w-full outline-none bg-gray-700 bg-opacity-50" />
                <p className="text-red-400 font-medium text-sm py-2">{errorMessage}</p>
                <button onClick={handleClickButton} className="p-3 bg-red-600 w-full my-6 text-xl font-semibold text-white rounded-lg">{toggleSignUpForm ? "Sign In" : "Sign Up"}</button>
                <p onClick={toggleSignUpIn} className="cursor-pointer font-semibold my-2 ">{toggleSignUpForm ?"New to Netflix? Sign up now." : "Already a user ! Please Sign In"}</p>
            </form>
        </div>
    )
}

export default Login;