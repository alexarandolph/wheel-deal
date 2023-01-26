import React, { useState } from 'react';

function TechForm() {
    const [technician, setTechnician] = useState({
        name: "",
        employee_number: "",
      });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        name: technician.name,
        employee_number: technician.employee_number
    }

    try {
      const response = await fetch("http://localhost:8080/api/technicians/", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{"Content-Type": "application/json"},
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setTechnician({...technician})
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
    }
    const handleInputChange = async (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setTechnician({ ...technician, [name]: value });
  }

  return (
    <div className="my-5">
      <div className="row">

        <div className="col">
          <div className="card shadow">
            <div className="card-body">

              <form className='form' onSubmit={handleSubmit} id="create-attendee-form">
                <h1 className="card-title"> Add a new technician</h1>
                <p className="mb-3">
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} required placeholder="name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} required placeholder="employee_number" type="text" id="employee_number" name="employee_number" className="form-control" />
                      <label htmlFor="employee_number">Employee Number</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechForm;
