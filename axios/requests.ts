import axios from "axios";
const API = axios.create({ baseURL : process.env.BASE_URL});
// auth reqs
export const register = async (email:string,password:string) => await API.post('/auth/register',{email,password});
export const login = async (email:string,password:string) => await API.post('/auth/login',{email,password});





// user todos reqs
export const getAllTodos = async (token:string) => await API.get('/user/alltodos',{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
export const addTask = async (token:string,title:string) => await API.post('/user/addtask',{title},{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
export const deleteTask = async (token:string,taskId:string) => await API.delete(`/user/deletetask/${taskId}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
export const updateTask = async (token:string,taskId:string) => await API.patch('/user/updtask',{taskId},{
    headers:{
        Authorization:`Bearer ${token}`
    }
});