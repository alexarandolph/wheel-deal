import React, { useState, useEffect } from 'react';

type Technician = {
  name: string;
};

type Service = {
  id: number;
  vin: string;
  customer_name: string;
  vip: boolean;
  service_date: string;
  service_time: string;
  technician: Technician;
  reason: string;
  status: boolean;
};

type ServiceData = {
  services: Service[];
};

function ServiceHistory() {
  const [services, setService] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = async () => {
    const response = await fetch('http://localhost:8080/api/services/');
    const content: ServiceData = await response.json();
    const serviceList = content.services;
    const searchResult = serviceList.filter(
      (service) => service.vin.includes(searchTerm)
    );
    setService(searchResult);
  };

  useEffect(() => {
    filteredServices();
  }, [searchTerm]);

  return (
    <div>
      <br></br>
      <div className="input-group">
            <input type="text" value={searchTerm} onChange={handleInputChange} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" onClick={filteredServices} className="btn btn-outline-secondary">Search VIN</button>
            </div>
      <br></br>
      <h1>Service Appointments</h1>
      <br></br>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {services?.map((service) => (
            <tr key={service.id}>
              <td>{service.vin}</td>
              <td>{service.customer_name}</td>
              <td>{service.service_date}</td>
              <td>{service.service_time.slice(0,5)}</td>
              <td>{service.technician.name}</td>
              <td>{service.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
