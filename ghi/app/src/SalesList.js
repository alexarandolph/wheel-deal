import { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
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
