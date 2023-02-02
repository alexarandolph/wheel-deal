import { useEffect, useState } from 'react';
import React from 'react';

type Employee = {
    employee_name: string;
    employee_number: number;
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

type SaleData = {
    sales: Sales[];
}


function SalesList() {
    const [sales, setSales] = useState<Sales[]>([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data: SaleData = await response.json();
            setSales(data.sales)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Employee Number</th>
                    <th>Customer</th>
                    <th>Automobile VIN</th>
                    <th>Sale Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{ sale.employee.employee_name }</td>
                            <td>{ sale.employee.employee_number }</td>
                            <td>{ sale.customer.customer_name }</td>
                            <td>{ sale.automobile.vin }</td>
                            <td> ${ sale.sale_price }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default SalesList;
