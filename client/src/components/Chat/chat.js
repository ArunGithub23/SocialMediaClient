import React, { useState, useEffect } from "react";
import Profiletop from "./profiletop";
import './chat.css'
import UserListPanel from "./users";
import { useSelector } from "react-redux";

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const senderid= useSelector((state) => state.authReducer.authData.user._id)
  let  prevchatuser= useSelector((state) => state.authReducer.chatuser);
  const BaseUrl = process.env.REACT_APP_BaseUrl1;



  const [recipient,setrecipient1]=useState(null);
  const [username,setusername]=useState(null);
  const [errormessage, seterrormessage] = useState({ msg: "", color: "red", display: "none" });

  useEffect(()=>{
    setrecipient1(prevchatuser.id)

  },[prevchatuser])


  //function to update variables of parent compo on child action
  const updaterecipient=(recipientid,username1)=>{
    setrecipient1(recipientid);
    setusername(username1);
    
    console.log("new recipient",recipient,username)

  }

  console.log("recipient is",recipient)
  console.log("senderid is",senderid)



  // Simulate receiving a message after a delay
  

    const test=async()=>{

      try {
        const data={senderid,recipient}
    const response=await fetch(`${BaseUrl}/chat/getmessagesbyid`,{
        'method':'post',
        'headers':{
            'content-type' : 'application/json'
        },
        'body':JSON.stringify(data)
    });
        const response1=await response.json()
        console.log('chat response is ',response1)

        response1.messages.forEach((item) => {
            const date = new Date(item.createdAt);
        
            // Extract hours and minutes
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
        
            // Format the time as hh:mm and update the object
            item.created_at = `${hours}:${minutes}`;
        });
        
        // Update the state with the modified array
        setMessages(response1.messages);
        console.log("response1.message",response1);
        
      } catch (error) {
        seterrormessage({ msg: "Error while making request to server", color: "red", display: "block" });

      }
    
    }
    
    
  
  
  // Handle sending a message
  const handleSend =async (e) => {

    try {
      const data= {senderid,"message":inputMessage,recipient}
    if(inputMessage!=""){
        const response=await fetch(`${BaseUrl}/chat/createchat`,{
            'method':'post',
            'headers':{
                'content-type' : 'application/json'
            },
            'body':JSON.stringify(data)

        });

      }
    } catch (error) {
      seterrormessage({ msg: "Error while making request to server1", color: "red", display: "block" });

    }
    
    }
    


  return (

    <div style={styles.chatMainContainer}>
         <p
        style={{
          position: "absolute",
          top: "20px",
          right: "50px",
          background: "#333",
          display: `${errormessage?.display}`,
          color: `${errormessage.color}`,
          border: `1px solid ${errormessage.color}`,
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        {errormessage.msg}
      </p>
  
        {/* <UserListPanel setid={updaterecipient}/> */}
    
    <div style={styles.chatContainer} onClick={test}>
        
        
        <Profiletop user={username} />
      <div style={styles.messagesContainer}>
      {messages.map((item) => (
  <div
    key={item?._id} // Assuming _id is used as the unique key for MongoDB documents
    style={{
      ...styles.message,
      alignSelf: item?.senderId == senderid ? "flex-end" : "flex-start", // Fixed senderId comparison
      background: item?.senderId == senderid ?  "linear-gradient(98.63deg, #007BFF 0%,rgb(158, 174, 115) 100%)":"linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%) ", // Fixed senderId logic
      color: item?.senderId === senderid ? "#fff" : "#fff", // Ensure text color contrasts background
      padding: "10px",
      borderRadius: "10px",
      maxWidth: "70%",
      marginBottom: "10px",
    }}
  >
    <div>{item?.message}</div>
    <div
      style={{
        fontSize: "0.8em",
        color: "#666",
        textAlign: "right",
        marginTop: "5px",
      }}
    >
      {new Date(item?.createdAt).toLocaleString()} {/* Format date nicely */}
    </div>
  </div>
))}

      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={(e)=>{handleSend(e);setInputMessage('')}} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {

    chatMainContainer:{
        display:'flex',
        justifyContent: "center",
        backgroundColor:'#f3f3f3',
        // height:'body',
        paddingBottom:"20vh",

    },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "80vh",
    width: "90%",
    // margin: "20px auto",
    border: "1px solid #cff",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor:'#f3f3f3'
  },
  messagesContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "16px",
    maxWidth: "70%",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 0",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    
  },
  sendButton: {
    padding: "8px 16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Chat;
