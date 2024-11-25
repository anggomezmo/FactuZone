import Login from "../pages/auth/Login"
import Dashboard from "../pages/Dashboard";
import Register from "../pages/auth/Register";
import MainView from "../pages/main-view/MainView";
import RegistroFacturas from "../pages/RegistroFacturas";
import ControlGastos from "../pages/ControlGastos";
import ReportesFinancieros from "../pages/ReportesFinancieros";
import { Navigate } from "react-router-dom";

const isAuthenticated = false; 

export let appRouter = [
    {
        path: '/',
        element: <MainView/>, 
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/registro-facturas',
        element: <RegistroFacturas />,
    },
    {
        path: '/control-gastos',
        element: <ControlGastos />,
    },
    {
        path: '/reportes-financieros',
        element: <ReportesFinancieros />,
    }
]