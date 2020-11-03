import React from 'react'
import { Table } from 'react-bootstrap'

function Training({ base_exp, capture_rate, growth_rate }) {
    function fixName(n) {
        let temp = n.split('-');
        let final = [];
        temp.forEach(x => {
            final.push(x[0].toUpperCase() + x.slice(1));
        });
        return final.join('-');
    }
    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th colSpan="2">Training</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Capture Rate</td>
                    <td>{capture_rate}</td>
                </tr>
                <tr>
                    <td>Base EXP</td>
                    <td>{base_exp}</td>
                </tr>
                <tr>
                    <td>Growth Rate</td>
                    <td>{fixName(growth_rate)}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Training
