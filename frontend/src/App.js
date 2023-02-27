
import Rigester from './components/Rigester';
import Navbars from './components/Navbars';
import {Routes,Route}  from "react-router-dom"
import Login from './components/Login';
import AdminHome from './components/home/AdminHome';


function App() {
  return (
    <div className="App">
      <Navbars/>
      <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/rigester' element={<Rigester/>}/>
     <Route path='/home' element={<AdminHome/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
