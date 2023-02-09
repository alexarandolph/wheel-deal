import React, {useState} from 'react';

type FormData = {
  employee_name: string;
  employee_number: string;
}

function EmployeeForm() {
  const [formData, setFormData] = useState<FormData>({
    employee_name: '',
    employee_number: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationUrl = 'http://localhost:8090/api/employees/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(locationUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        employee_name: '',
        employee_number: '',
      });
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({...formData, [inputName]: value});
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Sales Person</h1>
          <form onSubmit={handleSubmit} id="create-employee-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.employee_name} placeholder="Employee Name" required type="text" name="employee_name" className="form-control" />
              <label htmlFor="employee_name">Employee Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.employee_number} placeholder="Employee Number" required type="text" name="employee_number" className="form-control" />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
