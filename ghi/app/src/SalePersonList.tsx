import { useEffect, useState } from 'react';
import React from 'react';

type Employee = {
    employee_name: string;
    id: number;
}

type Customer = {
    customer_name: string;
}

type Automobile = {
    vin: string;
}

type Sales = {
    id: number;
    sale_price: number;
    employee: Employee;
    customer: Customer;
    automobile: Automobile;
}

type SalesData = {
    sales: Sales[];
}

type EmployeeData = {
    employees: Employee[];
}

function SalesPersonList() {
    const [filterValue, setFilterValue] = useState("")
    const [employees, setEmployees] = useState<Employee[]>([])
    const [sales, setSales] = useState<Sales[]>([])

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales/');

            if (response.ok) {
                const data: SalesData = await response.json();
                setSales(data.sales)
            } else {
                throw new Error(`Failed to fetch sales data: ${response.statusText}`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getEmployeeData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/employees/');

            if (response.ok) {
                const data: EmployeeData = await response.json();
                setEmployees(data.employees)
            } else {
                throw new Error(`Failed to fetch employee data: ${response.statusText}`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData();
        getEmployeeData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(e.target.value);
    };

    const filteredSales = () => {
        if (filterValue === "") {
            return sales;
        } else {
            return sales.filter((sale) =>
                sale.employee.id === parseInt(filterValue, 10)
            );
        }
    };


    return (
        <div>
            <h1>Sales person history</h1>
            <select onChange={handleChange}>
                <option value="">Choose a Sales Person</option>
                {employees.map(employee => {
                    return (
                        <option key={employee.id} value={employee.id}>{employee.employee_name}</option>
                    )
                })}
            </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales().map((sale) => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.employee.employee_name}</td>
                                <td>{sale.customer.customer_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.sale_price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesPersonList;
