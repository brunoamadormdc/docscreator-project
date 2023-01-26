import {
  createBrowserRouter,

} from "react-router-dom";
import Container from "../../Pages/Container/Container";
import Data from "../../Pages/Data/Data";
import Document from "../../Pages/Documents/Documents";
import Main from "../../Pages/Main/Main";




export default createBrowserRouter([
  {
    path: "/",
    element: <Main />

  },
  {
    path: "/criar_formulario",
    element: <Container />

  },
  {
    path: "/criar_dados",
    element: <Data />

  },
  {
    path: "/criar_documentos",
    element: <Document />

  }
]);