
import React,{ useState,useEffect } from 'react';
import {auth,provider,overwriteToFireBase,db,signOutGoogle} from '../firebase'
import firebase from "firebase/app";
import Links from './links';

export const UserContext =React.createContext();
const testUser=   {
  uid:'JVBBbvlceTVpasCdTRG285NmsyF3',
  email:'test@gmail',
  displayName:'test name',
  photoURL:'https://lh3.googleusercontent.com/a-/AOh14GiaXf3DrKKKqY6RI5fx2OIoMDaI9sNZsjttac8uucI=s96-c',
}

function Login() {

  // States
const [user,setuser]=useState();

// End States

// Functions

function signInWithGoogle() {
  auth.signInWithPopup(provider).then((result) => {
    var tempuser={
      uid:result.user.uid,
      email:result.user.email,
      displayName:result.user.displayName,
      photoURL:result.user.photoURL
    }
    

    setuser(tempuser)
  }
    );
};


useEffect(
  ()=>{
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        var tempuser={
          uid:authUser.uid,
          email:authUser.email,
          displayName:authUser.displayName,
          photoURL:authUser.photoURL
        }
    setuser(tempuser);

      }
      else{
        setuser(null);


      }
    })
  },[]
)
// console.log(user);




  
  

// End Functions




// End Use Effect
  return (

  <>
  {

user?
// logged in
<UserContext.Provider  value={[user]}>
<Links signOutGoogle={signOutGoogle}></Links>
</UserContext.Provider>:

// logged out
<button onClick={signInWithGoogle} style={{position:'absolute',top:'50%',left:'50%',backgroundColor:'#ccc',border:'none',padding:'1rem',transform: 'translate(-50%, -50%)'}}>Sign in with google</button>


  }



    </>
  );
}

export default Login;