import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import GLOBALS from '../globals'; 
import ProjectForm from './ProjectForm';
import Project from './Project';

// TODO need to style here and add functionality 

function ProjectList(props) {
    const [todos, setTodos] = useState(props.items); 
    
    useEffect(()=>{
        if(!todos) {
            setTodos(props.items);
        }
    })

    function refreshSprints(){
        Axios.get(GLOBALS.API_HOST_URL+'/get_user_projects?id='+props?.user?.id).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });   
        
        function onResponse(response){
            let newItems = response.data.data.result;
            setTodos(newItems);
            props.renderProjectsPage();
        }
    }
    

    
    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        todo.user_id = JSON.parse(localStorage.getItem("userData"))?.user?.id;
                
        return Axios.post(GLOBALS.API_HOST_URL+'/add_project', todo).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        
        function onResponse(res){
            const newTodos = [todo, ...todos];
            setTodos(newTodos);
            return refreshSprints();     
        }
  
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        newValue["id"] = todoId;
        return Axios.post(GLOBALS.API_HOST_URL+'/edit_project', {newValue}).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        function onResponse(res){
            return refreshSprints();     
        }
    }

    const removeTodo = id => {
        return Axios.post(GLOBALS.API_HOST_URL+'/remove_project', {id}).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        function onResponse(response){
            // const removeArr = [...todos].filter(todo => todo.id !== id);
            // setTodos(removeArr);
            return refreshSprints();     
        }

    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos (updatedTodos);
    }


    return (
        <div>
            <h1>User Projects</h1>
            <ProjectForm onSubmit={addTodo} />
            <div className='todosContainer'>
            <Project projects={todos ? todos: []} completeProject={completeTodo} removeProject={removeTodo} updateProject={updateTodo} />
            </div>
        </div>
    )
}

export default ProjectList;