import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import PrivateRoute from './utils/route/privateRoute';
import Home from './Page/Home/Home';
import Greeting from './Page/Greeting/Greeting';
import Registration from './Page/Registration/Registration';
import RegistrationForm from './Page/RegistrationForm/RegistrationForm';
import Courier from './Page/Courier/Courier';
import Customer from './Page/Customer/Customer';
import Order from './Page/Order/Order';
import Login from './Page/Login/Login';
import CreateOrder from './Page/CreateOrder/CreateOrder';

// function App() {
//   const [isFirstVisit, setIsFirstVisit] = useState(true);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path='login' element={<PrivateRoute />} >
//         </Route> */}
//         {/* <Route path='courier' element={<Courier />} />
//         <Route path='customer' element={<Customer />} /> */}
//         <Route path='login' element={<Login />} />


//         <Route path='/' element={isFirstVisit ? <Navigate to="/greeting" replace /> : <Home />} />
//         <Route path='greeting' element={<Greeting />} />
//         <Route path='registration' element={<Registration />} />
//         <Route path='registration/customer' element={<RegistrationForm />} />
//         <Route path='registration/courier' element={<RegistrationForm />} />

//         {/* <Route path='home' element={<Home />} /> */}
//         {/* <Route path='home/courier' element={<Courier />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/courier" element={<Courier />} />
          <Route path="/customer" element={<Customer />} />
        </Route>
        <Route path='/' element={isFirstVisit ? <Navigate to="/greeting" replace /> : <Home />} />
        <Route path='login' element={<Login />} />
        <Route path='order' element={<Order />} />
        <Route path='greeting' element={<Greeting />} />
        <Route path='registration' element={<Registration />} />
        <Route path='registration/customer' element={<RegistrationForm />} />
        <Route path='registration/courier' element={<RegistrationForm />} />

        <Route path='order/create' element={<CreateOrder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;