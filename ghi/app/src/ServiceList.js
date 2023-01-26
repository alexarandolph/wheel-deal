import React, { useState, useEffect } from 'react';

function ServiceList() {
    const [services, setServices] = useState([])

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/services/');

            if (response.ok) {
            const data = await response.json();
            setServices(data.services)
            }
        }
        catch (e) {
            console.log("error", e);
          }
        };
        useEffect(() => {
            getData();
          }, []);

    const handleCancel = async (id) => {
     await fetch( `http://localhost:8080/api/services/${id}/`,
        { method: "DELETE" });
        setServices(services.filter((a) => a.id !== id));};

    const handleFinish = async (id) => {
     await fetch(`http://localhost:8080/api/services/${id}/`,
        {
        method: "PUT",
        body: JSON.stringify({status: true}),
        headers: { "Content-Type": "application/json" },
        });
        setServices(services.filter((a) => a.id !== id));};

return (
<div className="container-fluid">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Customer name</th>
          <th>VIP</th>
          <th>Date</th>
          <th>Time</th>
          <th>Technician</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {services?.map(service => {
          return (
            <tr key={ service.id }>
              <td>{ service.vin }</td>
              <td>{ service.customer_name }</td>
              <td> { service.vip.toString() }</td>
              <td>{ service.service_date }</td>
              <td>{ service.service_time }</td>
              <td>{ service.technician.name }</td>
              <td>{ service.reason }</td>
              <td>
                <button onClick={()=>handleCancel(service.id)} className="btn btn-outline-danger" type="button">Cancel</button>
                <button onClick={()=>handleFinish(service.id)} className="btn btn-outline-success" type="button">Finished</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
)}
export default ServiceList;