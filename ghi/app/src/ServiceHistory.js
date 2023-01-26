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
      console.log(content.services)
      const searchResult = serviceList.filter((service) => service.vin.includes(searchService))
      setService(searchResult)
    }
      useEffect(() => {
        filteredService();
      }, []);


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //     if (vin) {
  //       const searchService = services.filter((service) =>
  //       service.vin === vin)
  //       setSearchService(searchService);
  //     } else {
  //     setSearchService(services)
  //   }
  // };

  return (
    <div>
      <div className="input-group">
            <input type="text" value={searchService} onChange={handleInputChange} className="form-control rounded" placeholder="Search Service" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" onClick={filteredService} className="btn btn-outline-secondary">Search VIN</button>
            </div>
      <h1>Service Appointments</h1>
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
              <td>{service.service_time}</td>
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




// const App = () => {
//   const [filterValue, setFilterValue] = useState(" ");
//   const [filterKey, setFilterKey] = useState("name");


//   const handleChange = (e) => {
//     setFilterValue(e.target.value);
//   };

//   const handleKeyChange = (e) => {
//     setFilterKey(e.target.value);
//   };

//   const filteredPeople = () => {
//     if (filterValue === " ") {
//       return people;
//     } else {
//       return people.filter((person) =>
//         person[filterKey].toLowerCase().includes(filterValue)
//       );
//     }
//   };

//   return (
//     <>
//       <h1>People</h1>
//       <select onChange={handleKeyChange}>
//         <option>name</option>
//         <option>city</option>
//         <option>email</option>
//       </select>

//       <input onChange={handleChange} placeholder="Filter For Name" />

//       <div>
//         {filteredPeople().map((person) => (
//           <div key={person.email}>
//             {person.name} - {person.email} - {person.city}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default App;
