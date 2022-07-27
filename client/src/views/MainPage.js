import React, { useRef, useState, useEffect } from "react";
import "../css/MainPage.css";
import TodoList from '../components/TodoList';
import ProjectList from '../components/ProjectList'
import Axios from 'axios';
import GLOBALS from '../globals'; 
import { ProSidebar, Menu, MenuItem, SubMenu ,SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaCreativeCommonsPd, FaGem, FaHeart} from 'react-icons/fa';
import { Link } from "react-router-dom";
import ProjectTodosList from "../components/ProjectTodosList";
import UserProfile from "../components/userDetailsUi/UserProfile";


/**
   @todo: fix when loging out the user session is keep there and then we can write workspace in the url to access the workspace (Security BUG).
**/

function MainPage(props) {
    
    // useReffernce
    const container = useRef(null);
    const [user, setUser] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [items, setItems] = useState(null);
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState(null);
    const [isHomePage, setIsHomePage] = useState(true);
    const [isUserProfile, setIsUserProfile] = useState(false);
    const dataTypes = ["item", "project"];
    console.log("dd",isHomePage);

    useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        setUser(userData.user);
    }else {
        logout()
    }
    }, []);
    useEffect(()=>{
        if(!items && user?.id) {
                Axios.get(GLOBALS.API_HOST_URL+'/get_user_items?id='+user?.id).then(onResponse).catch((e) => {
                    console.error(e);      //handle your errors
                });
                 
         }
         if(!projects && user?.id) {
            Axios.get(GLOBALS.API_HOST_URL+'/get_user_projects?id='+user?.id).then(onResponse).catch((e) => {
                console.error(e);      //handle your errors
            }); 
         }
    })


    
    
   function onResponse(response){ 
        let dataResult = response.data.data;
        let itemsData = Object(dataResult.result);
        let dataType = dataResult.dataType;
        if(dataType === dataTypes[0]) {
            console.log(itemsData);
            setItems(itemsData);
            setFilteredItems(itemsData);
            setIsHomePage(true);
            setProject(null);
            return;
        }else {
            setProjects(itemsData);
            setIsHomePage(false);
            return;
        }
        
    }
    
    function logout(){
        localStorage.removeItem('userData');
        props.setUserSession(null);
    }
    function renderHomePage(){ 
        Axios.get(GLOBALS.API_HOST_URL+'/get_user_items?id='+user?.id).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
    }
    
    function renderProjectsPage(){
        setIsUserProfile(false);
        Axios.get(GLOBALS.API_HOST_URL+'/get_user_projects?id='+user?.id).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        }); 
    }
    
    function renderProjectSprints(project){
         
         Axios.get(GLOBALS.API_HOST_URL+'/get_user_items?id='+user?.id).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        function onResponse(response){
            setProject(project);
            let newItems = [...response.data.data.result].filter(item => item.project_id === project.id);
            console.log("items", newItems);
   
            if(!isHomePage){
               setIsHomePage(true);
            }
            setFilteredItems(newItems);
        }
        

    }
    
    function renderUserProfile(){
        
        console.log("test");
        setIsHomePage(false);
        setIsUserProfile(true);
        
    }


    return (
        <div style={{display:"flex"}}>
            <div className="sideBar">
            <ProSidebar>
                <SidebarHeader>
                    <Menu iconShape="square">
                    <MenuItem onClick={renderHomePage} icon={<FaGem />}>HomePage</MenuItem>
                    <SubMenu title="Projects" icon={<FaHeart />}>
                    <MenuItem onClick={renderProjectsPage}>All Projects</MenuItem>
                    {projects?.map((project, index) => (
                       <MenuItem key={index} onClick={() => renderProjectSprints(project)}>{index + 1 + ". " + project.text}</MenuItem>
                    ))}
                    </SubMenu>
                    <MenuItem onClick={() => renderUserProfile()} icon={<FaGem />}>{user?.name + "'s"} Profile</MenuItem>
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
                
                {
                    
                isHomePage
                ?
                project 
                
                ?
                 
                <ProjectTodosList project={project} setItems={setItems} setFilteredItems={setFilteredItems} user={user} items={filteredItems}/>
                :
                <TodoList user={user} items={filteredItems}/>
                : 
                
                isUserProfile ? <UserProfile  user={user} /> :
                <ProjectList renderProjectsPage={renderProjectsPage} user={user} items={projects} />
                
                }
            </div>
        </div>

        <footer>
            <p>
                Created with <i className="fa fa-heart"></i> by
                <a target="_blank" href="/"> Ameer </a>
                - Read how I created this and how you can join the challenge
                <a target="_blank" href="/"> here</a>.
            </p>
        </footer>
        
        </div>  
            
        </div>
    );
}

export default MainPage;
