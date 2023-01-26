import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

function VehicleList() {
  const [vehicles, setVehicles] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/models/');

    if (response.ok) {
      const data = await response.json();
      setVehicles(data.models)
    }
  }

  useEffect(()=>{
    getData()
  }, [])


  return (
    <div className="container">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
        {vehicles?.map(vehicle => {
          return (
            <tr key={vehicle.id}>
              <td>{ vehicle.name }</td>
              <td>{ vehicle.manufacturer.name }</td>
              <td>
                <img src={ vehicle.picture_url } alt="" height="130px" width="175px"/>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default VehicleList;
