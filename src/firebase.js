import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig  =  {
    apiKey: "AIzaSyDfWQV0yU-xkOPjtFmRrODYgRa438xUC_g",
    authDomain: "linkbio-4124b.firebaseapp.com",
    projectId: "linkbio-4124b",
    storageBucket: "linkbio-4124b.appspot.com",
    messagingSenderId: "278137872294",
    appId: "1:278137872294:web:168ca97403e40ebf48f967"
  };



// all the required initialisations
firebase.initializeApp(firebaseConfig);
export  const db=firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

// call this function to sign in the user with google
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then((result) => {return(result)});
};

//call this function to signout the user with google auth
export const signOutGoogle=()=>{
  auth.signOut().then((result) => console.log(result))
}



//returns if the user is logged in or no
export function IsLoggedIn(){
  var user = firebase.auth().currentUser;

  if (user) {
    return true;
  } else {
    return false;
  }
}


//takes the object to be stored and the collection name
export  function pushToFireBase(obj,collectionName){
  db.collection(collectionName).add(obj)
}

//write the data if the doc doesnt exist otherwise overwrites the old doc
export  function overwriteToFireBase(obj,collectionName,docName){

db.collection(collectionName).doc(docName).set(obj)
}

// Just For Reference


//takes collection name and returns data


// write the function in a useEffect cause its async with firebase
export function getDataFromCollection(collectionName){

db.collection(collectionName).onSnapshot(result=>{
  result.docs.map(
    (doc)=>{
      var data=doc.data();
    //  console.log(data);
    }
  )
})

}