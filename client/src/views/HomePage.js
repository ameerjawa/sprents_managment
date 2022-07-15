import React, { useRef, useState } from "react";
import "../css/HomePage.css";
import Axios from 'axios';
import {Animated} from "react-animated-css";
import GLOBALS from '../globals'; // the variable name is arbitrary since it's exported as default





function HomePage(props) {
    
    // useReffernce
    const container = useRef(null);
    const emailInputForSignUp = useRef(null);
    const nameInputForSignUp = useRef(null);
    const paswordInputForSignUp = useRef(null);
    const emailInputForLogin = useRef(null);
    const passwordInputForLogin = useRef(null);
    const [message, setMessage] = useState("");
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    
    
    
    
    function toggleSignInUi(){
        container.current.classList.remove("right-panel-active");
        
    }
    function toggleSignUpUi(){
        container.current.classList.add("right-panel-active");
    }
    function showMessage(){
        setIsMessageVisible(true);
        setTimeout(() => {
            setIsMessageVisible(false);
          }, "5000")
        // TODO need to be implemented
    }
    
    function signUpUser(e){
        e.preventDefault();
        let userDetails = {};
        
        if(nameInputForSignUp.current.value) {
            userDetails.name = nameInputForSignUp.current.value;
        }else {
            setMessage("name cant be empty");
            return showMessage();
        }
        if(emailInputForSignUp.current.value) {
            userDetails.email = emailInputForSignUp.current.value;
        }else {
            setMessage("email cant be empty");
            return showMessage();
        }   
        if(paswordInputForSignUp.current.value) {
            userDetails.password = paswordInputForSignUp.current.value;
        }else {
            setMessage("password cant be empty");
            return showMessage();
        }   

        return Axios.post(GLOBALS.API_HOST_URL+'/signup', userDetails).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        
        function onResponse(res){
            // show message nice in the UI 
            setMessage(res.data.message);
            return showMessage();            
        }
        
    }
    
    function login(e){
        e.preventDefault();
        let userDetails = {};
        
        if(emailInputForLogin.current.value){
            userDetails.email = emailInputForLogin.current.value;
        }else {
            setMessage("email cant be empty");
            return showMessage();
        }     
        if(passwordInputForLogin.current.value){
            userDetails.password = passwordInputForLogin.current.value;
        }else {
            setMessage("password cant be empty");
            return showMessage();
        }    

        Axios.post(GLOBALS.API_HOST_URL + '/login', userDetails).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        
        function onResponse(res){
            // show message nice in the UI 
            setMessage(res.data.message);
            showMessage();            
        }
        
        
        
    }
    return (
        <div>
        <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
        <div ref={container} className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input ref={nameInputForSignUp} type="text" placeholder="Name" />
                    <input ref={emailInputForSignUp} type="email" placeholder="Email" />
                    <input ref={paswordInputForSignUp}  type="password" placeholder="Password" />
                    <button onClick={signUpUser}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="/">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input ref={emailInputForLogin} type="email" placeholder="Email" />
                    <input ref={passwordInputForLogin} type="password" placeholder="Password" />
                    <a href="/">Forgot your password?</a>
                    <button onClick={login}>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button onClick={toggleSignInUi} className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button onClick={toggleSignUpUi} className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="message">
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={isMessageVisible}>
            <div>
                {message}
            </div>
             </Animated>
        </div>

        <footer>
            <p>
                Created with <i className="fa fa-heart"></i> by
                <a target="_blank" href="/">Ameer</a>
                - Read how I created this and how you can join the challenge
                <a target="_blank" href="/">here</a>.
            </p>
        </footer>
            
        </div>
    );
}

export default HomePage;
