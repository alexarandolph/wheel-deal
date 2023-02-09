import { type } from 'os';
import React, {useState, useEffect} from 'react';

type FormData = {
  automobile: string;
  employee: string;
  customer: string;
  sale_price: string;
}

type Automobile = {
  id: number;
  vin: string;
}

type Employee = {
  id: number;
  employee_name: string;
}

type Customer = {
  id: number;
  customer_name: string;
}

const SaleForm = () => {
  const [sales, setSales] = useState<[]>([]);
  const [automobiles, setAutomobiles] = useState<Automobile[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<FormData>({
    automobile: '',
    employee: '',
    customer: '',
    sale_price: '',
  });

  const getData = async () => {
    const url = 'http://localhost:8090/api/sales/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
  };

  const getAutomobileData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobile);
    }
  };

  const getEmployeeData = async () => {
    const url = 'http://localhost:8090/api/employees/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setEmployees(data.employees);
    }
  };

  const getCustomerData = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  useEffect(() => {
    getData();
    getAutomobileData();
    getEmployeeData();
    getCustomerData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationUrl = 'http://localhost:8090/api/sales/';

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
        automobile: '',
        employee: '',
        customer: '',
        sale_price: '',
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({ ...formData, [inputName]: value });
  };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="mb-3">
                            <select onChange={handleFormChange} value={formData.automobile} required name="automobile" className="form-select">
                                <option value="">Choose an automobile</option>
                                {automobiles?.map(automobile => {
                                    return (
                                        <option key={automobile.id}>{ automobile.vin }</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleFormChange} value={formData.employee} required name="employee" className="form-select">
                                <option value="">Choose a sales person</option>
                                {employees.map(employee => {
                                    return (
                                        <option key={employee.id} value={employee.id}>{ employee.employee_name }</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleFormChange} value={formData.customer} required name="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>{ customer.customer_name }</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.sale_price} placeholder="Sale price" required type="text" name="sale_price" className="form-control" />
                            <label htmlFor="sale_price">Sale price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SaleForm;
