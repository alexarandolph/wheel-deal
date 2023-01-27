import { useEffect, useState } from 'react';

function SalesPersonList() {
    const [filterValue, setFilterValue] = useState("")
    const [employees, setEmployees] = useState([])
    const [sales, setSales] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    const getEmployeeData = async () => {
        const response = await fetch('http://localhost:8090/api/employees/');

        if (response.ok) {
            const data = await response.json();
            setEmployees(data.employees)
        }
    }

    useEffect(() => {
        getData();
        getEmployeeData();
    }, []);

    const handleChange = (e) => {
        setFilterValue(e.target.value);
    };

    const filteredSales = () => {
        if (filterValue === "") {
            return sales;
        } else {
            return sales.filter((sale) =>
                //truthy comparison because we have to compare a number to a string
                sale.employee.id == filterValue
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
                                <td>{sale.sale_price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesPersonList;
