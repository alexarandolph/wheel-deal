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

function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/services/");

      if (response.ok) {
        const data: ServiceData = await response.json();
        setServices(data.services.filter((service) => service.status !== true));
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleCancel = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/services/${id}/`, {
        method: "DELETE",
      });
      setServices(services.filter((a) => a.id !== id));
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleFinish = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/services/${id}/`, {
        method: "PUT",
        body: JSON.stringify({ status: true }),
        headers: { "Content-Type": "application/json" },
      });
      setServices(services.filter((a) => a.id !== id));
    } catch (e) {
      console.log("error", e);
    }
  };
return (
<div className="container-fluid">
  <br></br>
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
              <td>{ service.service_time.slice(0,5) }</td>
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
