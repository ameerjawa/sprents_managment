import React, { useRef, useState, useEffect } from "react";
import "../css/MainPage.css";
import TodoList from '../components/TodoList';
import Axios from 'axios';
import GLOBALS from '../globals'; 
import { ProSidebar, Menu, MenuItem, SubMenu ,SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem, FaHeart} from 'react-icons/fa';
import { Link } from "react-router-dom";


// add user to localstorage to keep signing in


function MainPage(props) {
    
    // useReffernce
    const container = useRef(null);
    const [user, setUser] = useState(null);
    const [items, setItems] = useState(null);
    const [isDataFromDataBase, setIdDataFromDataBase] = useState(false);

    useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        setUser(userData.user);
    }else {
        logout()
    }
    }, []);
    useEffect(()=>{
        if(!isDataFromDataBase && user?.id) {
            Axios.get(GLOBALS.API_HOST_URL+'/get_user_items?id='+user?.id).then(onResponse).catch((e) => {
                console.error(e);      //handle your errors
            });   
         }
    })


    
    
   function onResponse(response){ 
        let itemsData = Object(response.data.data);
        setIdDataFromDataBase(true);
        setItems(itemsData);
    }
    
    function logout(){
        localStorage.removeItem('user');
        props.setUserSession(null);
    }
    


    return (
        <div style={{display:"flex"}}>
            {/* <ProSidebar>

            </ProSidebar>; */}
            <div className="sideBar">
            <ProSidebar>
                <SidebarHeader>
                    <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>HomePage</MenuItem>
                    <SubMenu title="Projects" icon={<FaHeart />}>
                    <MenuItem onClick={() => console.log("ameeeer")}>All Projects</MenuItem>
                    <MenuItem>Project 1</MenuItem>
                    </SubMenu>
                    <MenuItem icon={<FaGem />}>{user?.name + "'s"} Profile</MenuItem>
                    </Menu>
                    {/**
                     *  You can add a header for the sidebar ex: logo
                     */}
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                    </Menu>
                    {/**
                     *  You can add the content of the sidebar ex: menu, profile details, ...
                     */}
                </SidebarContent>
                <SidebarFooter>
                <Menu iconShape="square">
                    <MenuItem onClick={logout} icon={<FaGem />}>logout
                        <Link to="/"/>
                    </MenuItem>
                    </Menu>
                    {/**
                     *  You can add a footer for the sidebar ex: copyright
                     */}
                </SidebarFooter>
            </ProSidebar>;
            </div>
        <div className="mainWorkspace">  
        <div className="containerParent">
            <div ref={container} className="sprints_container" id="container">
            <TodoList user={user} items={items} />
            </div>
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
            
        </div>
    );
}

export default MainPage;
