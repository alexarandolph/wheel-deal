import React, { useState, useEffect } from 'react';

function ServiceForm() {
  const [technicians, setTechnicians] = useState([]);
    const [service, setService] = useState({
        vin: "",
        customer_name: "",
        service_date: "",
        service_time: "",
        technician_list: [],
        reason: ""
      });

    const getTechnicians = async () => {
      const url = "http://localhost:8080/api/technicians/";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      }
    };

      useEffect(() => {
        getTechnicians();
      }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        customer_name: service.customer_name,
        vin: service.vin,
        service_date: service.service_date,
        service_time: service.service_time,
        technician: service.technician,
        reason: service.reason
    }
  try {
    const response = await fetch("http://localhost:8080/api/services/", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{"Content-Type": "application/json"},
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    setService({...service})
    window.location.href='/services/'
  } catch (error) {
    console.error(error);
  }
}

  const handleInputChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setService({ ...service, [name]: value });
  }

  return (
    <div className="my-5">
      <div className="row">

        <div className="col">
          <div className="card shadow">
            <div className="card-body">

              <form className='form' onSubmit={handleSubmit} id="create-attendee-form">
                <h1 className="card-title"> Schedule a service</h1>
                <p className="mb-3">
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} value={service.customer_name} required placeholder="customer_name" type="text" id="customer_name" name="customer_name" className="form-control" />
                      <label htmlFor="customer_name">Name</label>
                    </div>
                  </div>
                  </div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} value={service.vin} required placeholder="vin" type="text" id="vin" name="vin" className="form-control" />
                      <label htmlFor="vin">VIN</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} value={service.service_date} required placeholder="service_date" type="date" id="service_date" name="service_date" className="form-control" />
                      <label htmlFor="service_date">Date</label>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} value={service.service_time} required placeholder="service_time" type="time" id="service_time" name="service_time" className="form-control" />
                      <label htmlFor="service_time">Time</label>
                    </div>
                    </div>
                    <div className="col">
                  </div>
                  <div className='mb-3'>
                  <div className="mb-3">
              <select value={service.technician} onChange={handleInputChange} required name="technician" id="technician" className="form-select">
                <option value="">Choose a technician</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.name} value={technician.id}>
                      {technician.name}
                    </option>
                  );
                })}
              </select>
            </div>
            </div>
            <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} value={service.reason} required placeholder="reason" type="text" id="reason" name="reason" className="form-control" />
                      <label htmlFor="reason">Reason for service</label>
                    </div>
                  </div>
            </div>
                <button className="btn btn-lg btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
