import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SalesList from './SalesList';
import EmployeeForm from './EmployeeForm';
import CustomerForm from './CustomerForm';
import SaleForm from './SaleForm';
import SalesPersonList from './SalePersonList';
import ModelForm from './ModelForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import Nav from './Nav';
import TechForm from './TechForm';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';
import ServiceHistory from './ServiceHistory.js';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import VehicleList from './VehicleList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/services/' element={<ServiceList />} />
          <Route path='/services/new/' element={<ServiceForm />} />
          <Route path='/services/search/' element={<ServiceHistory />} />
          <Route path='/technicians/new/' element={<TechForm />} />
          <Route path='/manufacturers/' element={<ManufacturersList />} />
          <Route path='/manufacturers/new/' element={<ManufacturerForm />} />
          <Route path='/vehicles/' element={<VehicleList />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path='/employees' element={<EmployeeForm />} />
          <Route path='/customers' element={<CustomerForm />} />
          <Route path='/createsale' element={<SaleForm />} />
          <Route path='/list' element={<SalesPersonList />} />
          <Route path='/models' element={<ModelForm />} />
          <Route path='/automobiles' element={<AutomobileList />} />
          <Route path='/createautomobile' element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
