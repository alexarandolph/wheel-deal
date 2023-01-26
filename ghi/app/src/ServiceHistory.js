import React, { useState, useEffect } from 'react';

function ServiceHistory() {
  const [services, setService] = useState([]);
  const [searchService, setSearchService] = useState([])

  const handleInputChange = (e) => {
    setSearchService(e.target.value);
  };

  const filteredService = async () => {
      const response = await fetch("http://localhost:8080/api/services/")
      const content = await response.json()
      const serviceList = content.services
      const searchResult = serviceList.filter((service) => service.vin.includes(searchService))
      setService(searchResult)
    }
      useEffect(() => {
        filteredService();
      }, []);

  return (
    <div>
      <br></br>
      <div className="input-group">
            <input type="text" value={searchService} onChange={handleInputChange} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" onClick={filteredService} className="btn btn-outline-secondary">Search VIN</button>
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
