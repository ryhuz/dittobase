import React from 'react'
import { Table } from 'react-bootstrap';

function Stats({ stats }) {
    function fixName(name) {
        if (name === 'hp') {
            return 'HP';
        } else if (name.split('-').length === 1) {
            return name[0].toUpperCase() + name.slice(1);
        } else {
            let temp = name.split('-');
            return temp[0][0].toUpperCase() + temp[0].slice(1) + ' ' + temp[1][0].toUpperCase() + temp[1].slice(1);
        }
        return '';
    }
    return (
        <>
            <Table size="sm">
                <thead className="border rounded-lg">
                    <tr className="border rounded-lg">
                        <th colSpan="2" scope="col" className="border rounded-lg text-center"><div>Base Stats</div></th>
                        <th colSpan="2" scope="col" className="border rounded-lg text-center"><div>Stats at Level</div></th>
                    </tr>
                </thead>
                <tbody>
                    {stats.length && stats.map((el, index) => (
                        <tr key={index} className="border rounded-lg">
                            <td className="border rounded-lg pl-4" width="35%">
                                {fixName(el.name)}
                            </td>
                            <td className="text-center border rounded-lg" width="15%">
                                {el.base_stat}
                            </td>
                            <td className="border rounded-lg pl-4" width="35%">
                                {fixName(el.name)}
                            </td>
                            <td className="text-center border rounded-lg" width="15%">
                                calc
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Stats
