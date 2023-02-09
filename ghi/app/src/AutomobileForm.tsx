import React, { useEffect, useState } from 'react';

type FormData = {
  color: string;
  year: string;
  vin: string;
  model_id: number;
};

type Model = {
  id: number;
  make: string;
  name: string;
};

const AutomobileForm: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [formData, setFormData] = useState<FormData>({
    color: '',
    year: '',
    vin: '',
    model_id: 0,
  });

  const getData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const locationUrl = 'http://localhost:8100/api/automobiles/';

    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(locationUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        color: '',
        year: '',
        vin: '',
        model_id: 0,
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({ ...formData, [inputName]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.color}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.year}
                  placeholder="Year"
                  required
                  type="text"
                  name="year"
                  className="form-control"
                />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.vin}
                  placeholder="VIN"
                  required
                  type="text"
                  name="vin"
                  className="form-control"
                />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFormChange(e)}
                  value={formData.model_id}
                  required
                  name="model_id"
                  className="form-select"
                >
                  <option value="">Choose a model</option>
                  {models.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </form>
  );

}

export default AutomobileForm;
