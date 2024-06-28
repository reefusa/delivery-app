import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './Page/Home/Home';
import Greeting from './Page/Greeting/Greeting';

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isFirstVisit ? <Navigate to="/greeting" replace /> : <Home />} />
        <Route path='/greeting' element={<Greeting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;