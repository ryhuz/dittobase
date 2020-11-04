import React from 'react'
import { Table } from 'react-bootstrap';
import MoveType from './MoveType';


function MovesTable({ list, movesInfo }) {
    console.log(list);
    function fixName(name) {
        if (name.split('-').length === 1) {
            return name[0].toUpperCase() + name.slice(1);
        } else {
            let temp = name.split('-');
            return temp[0][0].toUpperCase() + temp[0].slice(1) + ' ' + temp[1][0].toUpperCase() + temp[1].slice(1);
        }
        return '';
    }
    function getURL(moveName){
        for(let i = 0; i<movesInfo.length; i++){
            if(moveName === movesInfo[i].name){
                return movesInfo[i].url;
            }
        }
    }
    function displayHead() {
        return (
            <thead>
                <tr>
                    {list.length && list.map(x => (
                        <th className="border rounded-lg h6 text-center align-middle text-center" colSpan={x.method === 'level-up' ? "4" : "3"} rowSpan={x.method === 'level-up' ? "1" : "2"}>
                            {fixName(x.method)}
                        </th>
                    ))}
                </tr>
                <tr>
                    <th className="h6 text-center" width="6%">
                        Level
                    </th>
                    <th className="h6 text-center" colSpan="3">
                        Move
                    </th>
                </tr>
            </thead>

        )
    }
    function displayBody() {
        let count = 0;
        let max = 0;
        list.forEach(el => {
            if (el.moves.length > max) {
                max = el.moves.length;
            }
        })
        let finalTable = [];
        while (count < max) {
            finalTable.push(
                <tr>
                    {list.map(method => (
                        <>
                            {method.method == 'level-up' && <td className={`pl-2 ${method.moves[count] && "data"}`}>{method.moves[count] && method.moves[count].level}</td>}
                            <td className={`pl-2 ${method.moves[count] && "data"}`}>{method.moves[count] && fixName(method.moves[count].name)}</td>
                            <td><MoveType param={'type'} url={method.moves[count] ? getURL(method.moves[count].name) : "" } /></td>
                            <td><MoveType param={'phy-spc'} url={method.moves[count] ? getURL(method.moves[count].name) : "" } /></td>
                        </>
                    ))}
                </tr>
            );
            count++;
        }
        return (
            <tbody>
                {finalTable}
            </tbody>

        )
    }
    return (
        <Table size="sm">
            {displayHead()}
            {displayBody()}

        </Table>
    )
}

export default MovesTable
