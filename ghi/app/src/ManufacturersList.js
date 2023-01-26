import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

function ManufacturersList() {
  const [manufacturers, setManufacturers] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/manufacturers/');

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <div className="container">
        <br></br>
        <h1>Manufacturers</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {manufacturers.map(manufacturer => {
          return (
            <tr key={manufacturer.id}>
              <td>{ manufacturer.name }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default ManufacturersList;
