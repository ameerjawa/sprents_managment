import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import '../../css/UserProfile.css';
import {Animated} from "react-animated-css";
import GLOBALS from '../../globals'; // the variable name is arbitrary since it's exported as default




function UserProfile(props){
    
    const emailInputForEditing = useRef(null);
    const nameInputForEditing = useRef(null);
    const paswordInputForEditing = useRef(null);
    const [message, setMessage] = useState("");
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    
    function showMessage(){
        setIsMessageVisible(true);
        setTimeout(() => {
            setIsMessageVisible(false);
          }, "5000")
        // TODO need to be implemented
    }
    
    function handleEditUserDetails(){
        
         // TODO fix this function does not working in the server
        let userDetails = {};
        let nameValue = nameInputForEditing.current.value;
        let emailValue = emailInputForEditing.current.value;
        let passwordValue = paswordInputForEditing.current.value; 
        
        if(nameValue !== "" && nameValue !== props.user.name){
            userDetails.name = nameValue;
        }
        if(emailValue !== "" && emailValue!== props.user.email){
            userDetails.email = emailValue;
        }
        if(passwordValue !== ""){
            userDetails.password = passwordValue;
        }
        if(Object.keys(userDetails).length !== 0){
            userDetails.user_id = props.user.id;
             return axios.post(GLOBALS.API_HOST_URL + "/edit_user_details", userDetails).then(onResponse).catch((e) => {
                console.error(e);      //handle your errors
            });
        } else{
            setMessage("nothing has been changed");
            return showMessage();
            
        }
    }
    
    function onResponse(response){
        setMessage(response.data.message);
        return showMessage();   
    }
    
    return (<div className='userProfileContainerParent'>
        
        <h1 className='title'>User Profile</h1>
        <div className='formContainer'>
            <label htmlFor="name">Edit your name</label>
            <input ref={nameInputForEditing} name="name" className='nameInput' placeholder={props.user.name} />
            <label htmlFor="email">Edit your email</label>
            <input ref={emailInputForEditing} name="email" className='emailInput' placeholder={props.user.email}/>
            <label htmlFor="password">Edit your password</label>
            <input ref={paswordInputForEditing} name="password" className='passwordInput' placeholder='password'/>
            <button onClick={handleEditUserDetails}>Submit</button>
            <div className="message">
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={isMessageVisible}>
            <div>
                {message}
            </div>
             </Animated>
        </div>
        </div>
           

    </div>)
}


export default UserProfile;