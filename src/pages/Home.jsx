
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { appRouter } from "../routes/routes";

let router = createBrowserRouter(appRouter);


function Home(){
    return(
    <RouterProvider router={router}/>
    )
}

export default Home