import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import Account from './Page/Account/Account';
import OrderCourierWork from './Page/OrderCourierWork/OrderCourierWork';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Admin from './Page/Admin/Admin';
import Dispute from './Page/Dispute/Dispute';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(language);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/courier" element={<Courier />} />
          <Route path="/customer" element={<Customer />} />
          {/* Order */}
          <Route path='/courier/order/:id' element={<Order />} />
          <Route path='/courier/order/work' element={<OrderCourierWork />} />
          <Route path='/customer/order/:id' element={<Order />} />
          <Route path='/customer/order/create' element={<CreateOrder />} />
          {/* Account */}
          <Route path='/account' element={<Account />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/dispute' element={<Dispute />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='greeting' element={<Greeting />} />
        <Route path='registration' element={<Registration />} />
        <Route path='registration/customer' element={<RegistrationForm />} />
        <Route path='registration/courier' element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



