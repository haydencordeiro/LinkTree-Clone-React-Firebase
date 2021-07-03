import React,{useContext,useEffect,useState,useRef} from 'react'
import {UserContext} from './Login';
import { pushToFireBase,getDataFromCollection ,db} from '../firebase';
import Links from './links';
import {useParams , NavLink, Link} from 'react-router-dom'
 function LinksShare({loggedIn}) {
    // console.log("Linkshare")

    const {user} =useParams();
    // console.log(user)


    var [LinkList,SetLinkList] = useState([]);
    var [mypage,setMypage] = useState(false);
    useEffect(()=>{
        if(user!=null){
        db.collection(String(user))
        .onSnapshot(result=>{
            SetLinkList(
          result.docs.map((doc)=>(
            {data:doc.data(),
            id:doc.id}  
            ))
        )
    })}  },[user]);



 
    if(mypage){
        return  <Links />
    }
    else {
        return (
        

      
    <div className="container OuterBox">
        { loggedIn ? <a   onClick={() => setMypage(true)} > My Links</a> :null }
        
        <div className="row text-center">
            <div className="col-md-12" style={{display:"flex",justifyContent:'space-around'}}>
                <h1 style={{textAlign:"center"}} > Link's</h1>

            </div>
            
        </div>
        <div className="row">
            <hr style={{width:" 50%",margin: "auto",marginTop: "30px",}} />
            {
                LinkList.map((obj,index)=>{
                    return (
                        <div className="col-12 linkField" key={ index }>
                        <button className="linkButton"><a href={obj.data.link} target="_blank">{obj.data.name}</a></button>
                      
                        </div>
        
                    )
                })
            }
           
            <hr style={{width: "50%",margin: "auto",marginTop: "30px",}} />

                
      
        </div>
    </div>




    )
        }
}

export default LinksShare