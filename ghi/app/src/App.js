import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechForm from './TechForm';
import ServiceForm from './ServiceForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
           <Route path='/technicians/new/' element={<TechForm />} />
           <Route path='/services/new/' element={<ServiceForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
