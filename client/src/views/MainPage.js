import React, { useRef, useState, useEffect } from "react";
import "../css/MainPage.css";
import TodoList from '../components/TodoList';
import Axios from 'axios';
import GLOBALS from '../globals'; 


// add user to localstorage to keep signing in


function MainPage(props) {
    
    // useReffernce
    const container = useRef(null);
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        console.log(user);
        setUser(user);
    }else {
        logout()
    }
    }, []);
    
    if(items.length === 0 && user?.user_id) {
            Axios.get(GLOBALS.API_HOST_URL+'/get_user_items?id='+user?.user_id).then(onResponse).catch((e) => {
                console.error(e);      //handle your errors
            });   
    }

    
    
    function onResponse(response){
        let itemsData = Object(response.data.data);
        setItems(itemsData);
    }
    
    function logout(){
        localStorage.removeItem('user');
        props.setUserSession(null);
    }
    


    return (
        <div>
        <h2>Weekly Coding Challenge #1: Sprints WorkSpace</h2>
        <div ref={container} className="container" id="container">
        <TodoList items={items} />
        </div>
        <button onClick={logout} className="logoutButton">
            logout
        </button>

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

export default MainPage;
