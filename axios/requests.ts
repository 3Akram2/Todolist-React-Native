import axios from "axios";


const API = axios.create({ baseURL : 'http://localhost:3002/' });
// auth reqs
export const register = async (email:string,password:string) => await API.post('/auth/register',{email,password});
export const login = async (email:string,password:string) => await API.post('/auth/login',{email,password});
// user todos reqs
export const getAllTodos = async (token:string) => await API.get('/user/todos',{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
export const addTask = async (token:string,title:string) => await API.post('/user/todos',{title},{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
export const deleteTask = async (token:string,taskId:string) => await API.delete(`/user/todos/${taskId}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
export const updateTask = async (token:string,taskId:string) => await API.patch('/user/todos',{taskId},{
    headers:{
        Authorization:`Bearer ${token}`
    }
});