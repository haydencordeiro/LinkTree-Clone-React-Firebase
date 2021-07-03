
import React,{ useState,useEffect } from 'react';
import {auth,provider,overwriteToFireBase,db,signOutGoogle} from '../firebase'
import firebase from "firebase/app";
import Links from './links';
import LinksShare from './linksShare';
import { BrowserRouter, Route, Link ,Switch,Redirect } from "react-router-dom";
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
const [loggedInuser,setLoggedIn]=useState(false);

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
    setLoggedIn(true)
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
    setLoggedIn(true)

      }
      else{
        setuser(null);
        setLoggedIn(false)


      }
    })
  },[]
)
// console.log(user);



function PrivateRoute ({user ,LoggedIn,notLogged}) {
    if(user){
        console.log("hasdf")
        
        return LoggedIn
    }
    else{
        console.log("ag")

        return notLogged
    }
  }
  
  


 function UserIdGet(){
     return (loggedInuser ? user.uid:null)
 }



  return (
  <>
  {


// logged in
<UserContext.Provider  value={[user]}>
<BrowserRouter  >
    <Switch>



    <Route  path="/:user" component={() => <LinksShare  loggedIn={loggedInuser}  />} />
    <PrivateRoute path='/'  user={loggedInuser} LoggedIn={<Redirect to={'/' +UserIdGet()   }  />} notLogged={<button onClick={signInWithGoogle} style={{position:'absolute',top:'50%',left:'50%',backgroundColor:'#ccc',border:'none',padding:'1rem',transform: 'translate(-50%, -50%)'}}>Sign in with google</button>} />


    </Switch>
</BrowserRouter>
</UserContext.Provider>

  }



    </>
  );
}

export default Login;