import React, { useState } from 'react';

function ManufacturerForm() {
    const [manufacturer, setManufacturer] = useState({
        name: "",
      });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        name: manufacturer.name,
    }

    try {
      const response = await fetch("http://localhost:8100/api/manufacturers/", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{"Content-Type": "application/json"},
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setManufacturer({...manufacturer})
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
    }
    const handleInputChange = async (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setManufacturer({ ...manufacturer, [name]: value });
  }

  return (
    <div className="my-5">
      <div className="row">

        <div className="col">
          <div className="card shadow">
            <div className="card-body">

              <form className='form' onSubmit={handleSubmit} id="create-attendee-form">
                <h1 className="card-title"> Add a new manufacturer</h1>
                <p className="mb-3">
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} required placeholder="name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
