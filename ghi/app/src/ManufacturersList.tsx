import { useEffect, useState } from 'react';
import React from 'react';

type Manufacturer = Readonly<{
  id: number;
  name: string;
}>

type ManufacturersData = Readonly<{
  manufacturers: Manufacturer[];
}>

function ManufacturersList() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/manufacturers/');

    if (response.ok) {
      const data: ManufacturersData = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
              <td>{manufacturer.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default ManufacturersList;
