
import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import { useState } from 'react';

import Landing from './pages/Landing';
import Authenticate from './pages/Authenticate';
import Category from './pages/Category';
import Course from './pages/Course';
import Indiviualcourse from './pages/Indiviualcourse';
import Shopingcart from './pages/Shopingcart';
import Instructorprofile from './pages/Instructorprofile';
import Userprofile from './pages/Userprofile';
import Whisliste from './pages/Whisliste';
import Indiviualmessage from './pages/Indiviualmessage';
import PaymentPage from './pages/PaymentPage';

function App() {
  const [loginvisible,setloginvisible]=useState(true);
  
  return (
    
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>}></Route>
            <Route path='/auth' element={<Authenticate loginvisible={loginvisible} setloginvisible={setloginvisible}/>}></Route>
            <Route path='/category' element={<Category/>}></Route>
            <Route path='/course' element={<Course/>}></Route>
            <Route path='/indiviualcourse' element={<Indiviualcourse />}></Route>
            <Route path='/shopingcart' element={<Shopingcart/>}/>
            <Route path='/instructor' element={<Instructorprofile/>}></Route>
            <Route path='/user' element={<Userprofile/>}></Route>
            <Route path='/whisliste' element={<Whisliste/>}></Route>
            <Route path='/indiviualmessage' element={<Indiviualmessage/>}></Route>
            <Route path="/payment" element={<PaymentPage/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
