import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constant";

const Header = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store=> store.user)

    const handleSignOut = ()=>{
        signOut(auth).then(()=>{
        }).catch((error)=>{
            console.error("error occured")
        })
        
    }

    const unSubscribe =  useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          if(user){
            const {uid, email, displayName} = user;
            dispatch(addUser({uid:uid, email:email, displayName:displayName}));
            navigate("/browse");
          }else{
            dispatch(removeUser());
            navigate("/");
          }
        });

        return ()=> unSubscribe;
      },[]) 
    return(
        <div className="flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 ">
                <img className="w-44 cursor-pointer" src={NETFLIX_LOGO}/>
                
                {
                    user && <button onClick={handleSignOut} className="bg-red-600 p-2 h-10 mt-4 rounded-lg text-white font-semibold">Sign Out</button>
                }
            
        </div>
    )
}

export default Header;