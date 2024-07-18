import { useState, useRef } from "react";
import Header from "./Header";
import { validation } from "../utils/validation";

const Login = ()=> {
    const [toggleSignUpForm, setToggleSignUpForm]= useState(true);
    const [errorMessage, setErrorMessage]= useState(null)

    const email = useRef(null);
    const password = useRef(null)

    const handleClickButton = ()=>{
        //validation
        const message = validation(email.current.value, password.current.value)
        setErrorMessage(message)

    }
    const toggleSignUpIn = ()=>{
        setToggleSignUpForm(!toggleSignUpForm)
    }
    return(
        <div>
            <Header/>
            <div className="absolute">
                <img alt="bg-image" src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"/>
            </div>
            <form onSubmit={(e)=> e.preventDefault()} className="w-3/12 absolute p-6  bg-black mx-auto left-0 right-0 my-36 text-white rounded-lg bg-opacity-80">
                <h1 className="text-white font-bold text-3xl p-2 m-2">{toggleSignUpForm ? "Sign In" : "Sign Up"}</h1>
                {!toggleSignUpForm && <input type="text" placeholder="Username" className="p-3 my-3 w-full outline-none bg-gray-700 bg-opacity-50" />}
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