import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Error from './Layouts/Error/Error';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/admindashboard/:page/:user" element={<Admin/>}/>
        <Route exact path="/userdashboard/:page/:user" element={<User/>}/>
        <Route exact path="/userdashboard/:page/:user/:acc" element={<User/>}/>
        <Route exact path="/userdashboard/:page/:user/:acc/:trtype" element={<User/>}/>
        <Route exact path="*" element={<Error/>}/>

      </Routes>
    </BrowserRouter>
    {/* /:username/:role */}
    </>
  );
}

export default App;
