import React from 'react'
import { Table, Badge } from 'react-bootstrap'

function PokeDex({ abilities, height, weight, type, shape, habitat, }) {
    function fixName(n) {
        if (n.split('-').length === 1){
            return n[0].toUpperCase() + n.slice(1);
        }else{
            let temp = n.split('-');
            return temp[0][0].toUpperCase() + temp[0].slice(1) + ' ' + temp[1][0].toUpperCase() + temp[1].slice(1);
        }
        
    }
    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th colSpan="2">PokéDex</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="align-middle">Type</td>
                    <td>
                        {type.map((t, index) => (
                            <span key={index}>
                                <Badge variant={`type ${t}`} className="py-1">{fixName(t)}</Badge>
                            </span>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Abilities</td>
                    <td>
                        {abilities.map((a,index)=>(
                            <div>{fixName(a.ability.name)}</div>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>{Number(height)/10} m</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{Number(weight)/10} kg</td>
                </tr>
                <tr>
                    <td>Shape</td>
                    <td>{fixName(shape)}</td>
                </tr>
                <tr>
                    <td>Habitat</td>
                    <td>{fixName(habitat)}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default PokeDex
