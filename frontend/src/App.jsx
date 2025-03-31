import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductDashboard from './pages/ProductManagement/ProductDashboard';
import CreateProduct from './pages/ProductManagement/CreateProduct';
import ShowProducts from './pages/ProductManagement/ShowProducts';
import EditProducts from './pages/ProductManagement/EditProducts';
import DeleteProducts from './pages/ProductManagement/DeleteProducts';
import ProductsCardPage from './pages/ProductManagement/ProductsCardPage';
import ProductDetailsPage from './pages/ProductManagement/ProductDetailsPage';
import OilPage from './pages/ProductManagement/OilPage';
import HaircarePage from './pages/ProductManagement/HaircarePage';
import RemediesPage from './pages/ProductManagement/RemediesPage';
import SkincarePage from './pages/ProductManagement/SkincarePage';

import DoctorDashboard from './pages/DoctorManagement/DoctorDashboard';
import CreateDoctor from './pages/DoctorManagement/CreateDoctor';
import ShowDoctors from './pages/DoctorManagement/ShowDoctors';
import EditDoctor from './pages/DoctorManagement/EditDoctors';
import DeleteDoctor from './pages/DoctorManagement/DeleteDoctor';
import DoctorsCardPage from './pages/DoctorManagement/DoctorsCardPage';
//import DoctorDetailsPage from './pages/DoctorManagement/DoctorDetailsPage';
import ENTPage from './pages/DoctorManagement/ENTPage';
import GeneralPage from './pages/DoctorManagement/GeneralPage';
import NeurologyPage from './pages/DoctorManagement/NeurologyPage';
import GastrocardiacPage from './pages/DoctorManagement/GastrocardiacPage';
import GynecologyPage from './pages/DoctorManagement/GynecologyPage';
import OrthopedicPage from './pages/DoctorManagement/OrthopedicPage';
import PanchakarmaPage from './pages/DoctorManagement/PanchakarmaPage';
import PediatricPage from './pages/DoctorManagement/PediatricPage';
import CreateBookingPage from './pages/BookingManagement/CreateBookingPage';
import CreatePayments from './pages/PaymentManagement/Payment/CreatePayments';

import ReturnTable from './pages/ReturnRefundManagement/ReturnDashboard';
import CreateReturns from './pages/ReturnRefundManagement/CreateReturns';
import DeleteReturn from './pages/ReturnRefundManagement/DeleteReturn';
import EditReturn from './pages/ReturnRefundManagement/EditReturn';
import ShowReturn from './pages/ReturnRefundManagement/ShowReturn';

import Home from './components/Home';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AboutUs from './components/aboutUs';

import CartPage from "./pages/PaymentManagement/Cart/CartPage";


import CreateExpenses from './pages/PaymentManagement/Payment/CreateExpenses';
import DeleteExpense from './pages/PaymentManagement/Payment/DeleteExpense';
import EditExpense from './pages/PaymentManagement/Payment/EditExpense';
import ShowExpense from './pages/PaymentManagement/Payment/ShowExpense';
import ExpenseDashboard from './pages/PaymentManagement/Payment/ExpenseDashbord';
import NetProfit from './pages/PaymentManagement/Payment/NetProfit';


import CreateDelivery from './pages/DeliveryManagement/CreateDeliverys';
import DeleteDelivery from './pages/DeliveryManagement/DeleteDelivery';
import DeliveryDashboard from './pages/DeliveryManagement/DeliveryDashboard';
import EditDelivery from './pages/DeliveryManagement/EditDelivery';
import ShowDelivery from './pages/DeliveryManagement/ShowDelivery';






const App = () => {
  return (
    <Routes>
     <Route path='/products' element={<ProductDashboard />} />
      <Route path='/products/create' element={<CreateProduct />} />
      <Route path='/products/details/:id' element={<ShowProducts />} />
      <Route path='/products/edit/:id' element={<EditProducts />} />
      <Route path='/products/delete/:id' element={<DeleteProducts />} />
      <Route path='/products/card' element={<ProductsCardPage />} />
      <Route path='/products/:id' element={<ProductDetailsPage />} />
      <Route path='/products/haircare' element={<HaircarePage />} />
      <Route path='/products/oil' element={<OilPage />} />
      <Route path='/products/remedies' element={<RemediesPage />} />
      <Route path='/products/skincare' element={<SkincarePage />} />

      <Route path='/doctors' element={<DoctorDashboard />} />
      <Route path='/doctors/create' element={<CreateDoctor />} />
      <Route path='/doctors/details/:id' element={<ShowDoctors />} />
      <Route path='/doctors/edit/:id' element={<EditDoctor />} />
      <Route path='/doctors/delete/:id' element={<DeleteDoctor />} />
      <Route path='/doctors/card' element={<DoctorsCardPage />} />
      <Route path='/doctors/:id' element={<ShowDoctors />} />
      <Route path='/doctors/ent' element={<ENTPage />} />
      <Route path='/doctors/general' element={<GeneralPage />} />
      <Route path='/doctors/neurology' element={< NeurologyPage />} />
      <Route path='/doctors/gastrocardiac' element={< GastrocardiacPage />} />
      <Route path='/doctors/gynecology' element={< GynecologyPage />} />
      <Route path='/doctors/orthopedic' element={< OrthopedicPage />} />
      <Route path='/doctors/panchakarma' element={< PanchakarmaPage />} />
      <Route path='/doctors/pediatric' element={< PediatricPage />} />
      <Route path='/booking' element={<CreateBookingPage />} />
      <Route path='/payment' element={<CreatePayments />} />

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/about' element={<AboutUs />} />

      <Route path="/cart" element={<CartPage />} />

      
      <Route path='/expenses/create' element={<CreateExpenses />} />
      <Route path='/expenses/delete/:id' element={<DeleteExpense />} />
      <Route path='/expenses/edit/:id' element={<EditExpense />} />
      <Route path='/expenses/details/:id' element={<ShowExpense />} />
      <Route path='/expenses' element={<ExpenseDashboard />} />
      <Route path='/profits' element={<NetProfit />} />


      <Route path='/deliverys' element={<DeliveryDashboard />} />
      <Route path='/deliverys/create' element={<CreateDelivery />} />
      <Route path='/deliverys/details/:id' element={<ShowDelivery />} />
      <Route path='/deliverys/edit/:id' element={<EditDelivery />} />
      <Route path='/deliverys/delete/:id' element={<DeleteDelivery />} />
       
      <Route path='/records' element={<ReturnTable/>} />
      <Route path='/records/create' element={<CreateReturns />} />
      <Route path='/records/details/:id' element={<ShowReturn />} />
      <Route path='/records/edit/:id' element={<EditReturn />} />
      <Route path='/records/delete/:id' element={<DeleteReturn />} />
     
    
    </Routes>
  );
};

export default App;
