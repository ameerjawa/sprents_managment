import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import Axios from 'axios';
import GLOBALS from '../globals'; 

// TODO need to style here and add functionality 

function TodoList(props) {
    
    const [todos, setTodos] = useState(props.items);

    function refreshSprints(){

        Axios.get(GLOBALS.API_HOST_URL+'/get_user_items?id='+props?.user?.id).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });   
        
        
        function onResponse(response){
            setTodos(response.data.data.result);
            
        }
    }
    

    
    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        todo.user_id = JSON.parse(localStorage.getItem("userData"))?.user?.id;
        todo.project_id = props.project ? props.project.id: null;
                
        return Axios.post(GLOBALS.API_HOST_URL+'/add_item', todo).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        
        function onResponse(res){
            return refreshSprints();     
        }
  
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        newValue["id"] = todoId;
        return Axios.post(GLOBALS.API_HOST_URL+'/edit_item', {newValue}).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        function onResponse(res){
            return refreshSprints();     
        }
    }

    const removeTodo = id => {
        return Axios.post(GLOBALS.API_HOST_URL+'/remove_item', {id}).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        function onResponse(response){
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
            <h1>Weekly Sprents</h1>
            <TodoForm onSubmit={addTodo} />
            <div className='todosContainer'>
            <Todo todos={todos ? todos: []} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
            </div>
        </div>
    )
}

export default TodoList;