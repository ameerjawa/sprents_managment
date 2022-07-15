import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import Axios from 'axios';
import GLOBALS from '../globals'; 

// TODO need to style here and add functionality 

function TodoList(props) {
    const [todos, setTodos] = useState([]);

    
    useEffect(()=>{
        if(todos.length === 0) {
            setTodos(props.items);
        }
    })
    

    
    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        todo.user_id = JSON.parse(localStorage.getItem("user"))?.user_id;
                
        return Axios.post(GLOBALS.API_HOST_URL+'/add_item', todo).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        
        
        function onResponse(res){
            const newTodos = [todo, ...todos];
            return setTodos(newTodos);                
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
            setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
        }
    }

    const removeTodo = id => {
        return Axios.post(GLOBALS.API_HOST_URL+'/remove_item', {id}).then(onResponse).catch((e) => {
            console.error(e);      //handle your errors
        });
        function onResponse(response){
            console.log("response   -- >> ",response);
            const removeArr = [...todos].filter(todo => todo.id !== id);
            return setTodos(removeArr);
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
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <div className='todosContainer'>
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
            </div>
        </div>
    )
}

export default TodoList;