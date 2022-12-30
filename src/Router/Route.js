import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTask from "../Pages/AddTask/AddTask"
import MyTask from "../Pages/MyTask/MyTask";
import Login from "../Pages/Login/Login";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";
import SignUp from "../Pages/SignUp/SignUp";
import Update from "../Pages/Update/Update";
import PrivateRoute from "./PrivateRoute";
import Details from "../Pages/Details/Details";



export const router = createBrowserRouter([
    {
        path: '',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <AddTask></AddTask>
            },
            {
                path: '/myTask',
                element: <MyTask></MyTask>
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/completetask',
                element: <CompleteTask></CompleteTask>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/task/:id',
                loader: ({ params }) => {
                    return fetch(`https://daily-task-server-morshed0099.vercel.app/task/${params.id}`)
                },
                element: <Update></Update>
            },
            {
                path: '/details/:id',
                loader: ({ params }) => {
                    return fetch(`https://daily-task-server-morshed0099.vercel.app/details/${params.id}`)
                },
                element:<Details></Details>
            }

        ]

    }
]) 