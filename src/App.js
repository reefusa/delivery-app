import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './Page/Home/Home';
import Greeting from './Page/Greeting/Greeting';
import Registration from './Page/Registration/Registration';
import RegistrationForm from './Page/RegistrationForm/RegistrationForm';

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isFirstVisit ? <Navigate to="/greeting" replace /> : <Home />} />
        <Route path='/greeting' element={<Greeting />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='registration/customer' element={<RegistrationForm />} />
        <Route path='registration/courier' element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;