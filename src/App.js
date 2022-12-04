import "./App.css";
import {useState, useEffect} from 'react';
import { getDatabase,onChildAdded,push, ref, set } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Cam from "./img/cam.png";
import Add from "./img/add.png";
import More from "./img/more.png";
import Sidebar from "./components/Sidebar";



function App() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setUser({name:result.user.displayName, email: result.user.email})
      console.log(token, user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  const updateHeight=()=>{
    const el = document.getElementById('chat');
    if(el){
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(() => {  
    onChildAdded(chatListRef, (data) =>{
      setChats(chats=>[...chats, data.val()])
      setTimeout(()=>{
        updateHeight()
      },100)
    });
  }, [])
  

  const sendChat = ()=>{

    const chatRef = push(chatListRef);
    set(chatRef, {
      user, message:msg
    });

    setMsg("");
  }


  return (<>
    {user.email ? null : <div>
        <button className="google-btn" onClick={e=>{googleLogin()}}>GOOGLE SIGN-IN</button>
      </div>}
  
    <div className="container-fluid main-container">
      <div className="row">
      {/* SIDEBAR  */}
        {user.email ? <div className="col-lg-4 col-md-4 col-sm-12 sidebar">
          <Sidebar />
        </div> : null}

        {/* CHAT BOX  */}
        <div className="col-lg-8 col-md-8 col-sm-12 main-chat">
          <div className="chat-body">

          {user.email ? <div>
            <h4>User : {user.name} <span>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
            </span> </h4>
            
            <div id='chat' className="chat-container">
              {chats.map((c,i) => (
                <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
                <p className="chatbox">
                  <strong>{c.user.name}: </strong>
                  <span>{c.message}</span>
                </p>
              </div>
              ))}
            </div>
            <div className="btm ">
              <input type="text" 
              onInput={e=> setMsg(e.target.value)}
              value={msg}
              placeholder="enter your message..." >
              </input>

              <button
              onClick={e=> sendChat()}
              >SEND</button>
            </div>
          </div> : null}
          
        </div>
      </div>
    </div>
  </div>
     
  </>);
}

export default App;
