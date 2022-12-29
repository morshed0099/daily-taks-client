import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AddTask/AddTask"
import MyTask from "../Pages/MyTask/MyTask";
import Login from "../Pages/Login/Login";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";
import SignUp from "../Pages/SignUp/SignUp";
import Update from "../Pages/Update/Update";
import PrivateRoute from "./PrivateRoute";


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
                element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
                
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
                element:<PrivateRoute><CompleteTask></CompleteTask> </PrivateRoute>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/task/:id',
                loader:({params})=>{
                   return fetch(`https://daily-task-server-one.vercel.app/task/${params.id}`)
                },
                element:<Update></Update>
            }
        ]
        
    }
]) 