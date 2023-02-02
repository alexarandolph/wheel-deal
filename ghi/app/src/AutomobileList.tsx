import {  useEffect, useState } from 'react';
import React from 'react';

type Model = Readonly <{
    name: string;
    manufacturer: Manufacturer;
}>

type Manufacturer = Readonly <{
    name: string;
}>

type Automobile = Readonly<{
    id: number;
    name: string;
    vin: string;
    color: string;
    year: number;
    model: Model;
  }>


  type AutomobileData = Readonly<{
    automobiles: Automobile[];
  }>

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState<Automobile[]>([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok) {
            const data: AutomobileData = await response.json();
            setAutomobiles(data.automobiles)
        }
    }

    useEffect(()=>{
        getData();
    }, [])

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {automobiles.map(automobile => {
                    return (
                        <tr key={automobile.id}>
                            <td>{ automobile.vin }</td>
                            <td>{ automobile.color }</td>
                            <td>{ automobile.year }</td>
                            <td>{ automobile.model.name }</td>
                            <td>{ automobile.model.manufacturer.name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AutomobileList;
