import Login from "../pages/auth/Login"
import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";

const isAuthenticated = false; 

export let appRouter = [
    {
        path: '/',
        element: <Navigate to="/login" replace />, 
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    }
]