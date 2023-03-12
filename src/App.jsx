import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './App.module.scss';
import Sidebar from './Components/UI/Sidebar';

function App() {
  return (
    <>
      <Sidebar />
      
        <Router />
     
      
    </>

  );
}

export default App;
