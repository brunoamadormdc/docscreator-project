import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './App.module.scss';
import Sidebar from './Components/UI/Sidebar';

function App() {
  return (
    <>
      <Sidebar />
      <div className={`container-fluid ${Styles['__app']}`}>
        <Router />
      </div>
      
    </>

  );
}

export default App;
