import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechForm from './TechForm';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';
import ServiceHistory from './ServiceHistory.js';
import ManufacturersList from './ManufacturersList';

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
          {/* <Route path='/manufacturers/new/' element={<TechForm />} /> */}
          {/* <Route path='/vehicles/' element={<TechForm />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
