import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AddTask/AddTask"
import MyTask from "../Pages/MyTask/MyTask";
import Login from "../Pages/Login/Login";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";
import SignUp from "../Pages/SignUp/SignUp";


export const router=createBrowserRouter([
    {
        path:'',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/addtask',
                element:<AddTask></AddTask>
                
            },
            {
                path:'/mytask',
                element:<MyTask></MyTask>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/completetask',
                element:<CompleteTask></CompleteTask>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            }
        ]
        
    }
]) 