import BrowserRouteProvider from './BrowerRouteProvider/BrowserRouteProvider.js'
import {
    RouterProvider
  } from "react-router-dom";

  
function Router() {
    return (
        <>
        <RouterProvider router={BrowserRouteProvider} />
        </>
    )
}

export default Router