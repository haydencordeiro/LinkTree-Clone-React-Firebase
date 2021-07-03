import React,{useContext,useEffect,useState,useRef} from 'react'
import {UserContext} from './Login';
import { pushToFireBase,getDataFromCollection ,db} from '../firebase';


 function Links({signOutGoogle}) {



    function AddLink(){
        var name=prompt("Enter Name");
        var link=prompt("Enter Link");
        console.log(user.uid)
        pushToFireBase({name:name,link:link},user.uid)
    
    }
    function DeleteLink(id){
        // console.log(id)
        db.collection(String(user.uid)).doc(String(id)).delete();

    }


    var user=useContext(UserContext)[0];
    var [LinkList,SetLinkList] = useState([]);
    useEffect(()=>{
        if(user!=null){
        db.collection(String(user.uid))
        // .orderBy('createdat','asc')
        .onSnapshot(result=>{
            SetLinkList(
          result.docs.map((doc)=>(
            {data:doc.data(),
            id:doc.id}  
            ))
        )
    })}  },[user]);



    return (

      
    <div className="container OuterBox">
        <div className="row text-center">
            <div className="col-md-12" style={{display:"flex",justifyContent:'space-around'}}>
                <h1 >{user.displayName} Link's</h1>
                <a onClick={signOutGoogle} className="fa fa-sign-out" >Logout</a >
                <a onClick={AddLink} className="fa fa-plus" >Add</a >
                
            </div>
            
        </div>
        <div className="row">
            <hr style={{width:" 50%",margin: "auto",marginTop: "30px",}} />
            {
                LinkList.map((obj,index)=>{
                    return (
                        <div className="col-12 linkField" key={ index }>
                        <button className="linkButton"><a href={obj.data.link} target="_blank">{obj.data.name}</a></button>
                        <a className="fa fa-trash" onClick={()=>DeleteLink(obj.id)} id={obj.id}></a>
                        </div>
        
                    )
                })
            }
           
            <hr style={{width: "50%",margin: "auto",marginTop: "30px",}} />

                
      
        </div>
    </div>




    )
}

export default Links