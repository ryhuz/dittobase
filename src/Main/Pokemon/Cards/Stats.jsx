import React, { useState } from 'react'
import { Table, Col, ProgressBar } from 'react-bootstrap';

function Stats({ stats }) {
    const [slider, setLevelSlider] = useState(1);
    function fixName(name) {
        let n = name;
        if (n.includes('special')) {
            n = n.replace('special', 'sp');
            n = n.replace('attack', 'atk');
            n = n.replace('defense', 'def');
        }

        if (n === 'hp') {
            return 'HP';
        } else if (n.split('-').length === 1) {
            return n[0].toUpperCase() + n.slice(1);
        } else {
            let temp = n.split('-');
            return temp[0][0].toUpperCase() + temp[0].slice(1) + ' ' + temp[1][0].toUpperCase() + temp[1].slice(1);
        }
        return '';
    }
    function onSlide(e) {
        setLevelSlider(e.target.value);
    }
    function calcMin(base, level, stat) {
        let min;
        if (stat === 'hp') {
            min = Math.floor(base * 2 * Number(level) / 100) + Number(level) + 10;
        } else {
            min = Math.floor(base * 2 * Number(level) / 100) + 5;
        }
        return min;
    }
    function calcMax(base, level, stat) {
        let max;
        if (stat === 'hp') {
            max = Math.floor(((base + 15) * 2 + 63) * Number(level) / 100) + Number(level) + 10;
        } else {
            max = Math.floor(((base + 15) * 2 + 63) * Number(level) / 100) + 5;
        }
        return max;
    }
    function calcPBar(base, stat) {
        let max;
        switch (stat) {
            case 'hp':
                max = 255;
                break;
            case 'attack':
                max = 190;
                break;
            case 'defense':
                max = 250;
                break;
            case 'special-attack':
                max = 194;
                break;
            case 'special-defense':
                max = 250;
                break;
            case 'speed':
                max = 200;
                break;
        }
        let p = base/max*100;
        if (p<15){
            return 'v-low';
        }else if (p<30){
            return 'low'
        }else if (p<48){
            return 'medium'
        }else if (p<65){
            return 'high'
        }else if (p<82){
            return 'v-high'
        }else {
            return 'max'
        }
    }
    return (
        <>
            <Col className="mt-2">
                <hr />
                <h3>Stats</h3>
                <Table size="sm">
                    <thead className="">
                        <tr className="">
                            <th colSpan="4" scope="col" className="p-3">
                                <span className="py-2">Stats at Level {slider}</span>
                                <input type="range" min="1" max="100" value={slider} onChange={onSlide} id="slider" />
                            </th>
                        </tr>
                        <tr>
                            <th className="align-middle">Stat</th>
                            <th className="text-center align-middle">Base Value</th>
                            <th></th>
                            <th className="text-center align-middle">
                                Min
                            </th>
                            <th className="text-center align-middle">
                                Max
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((el, index) => (
                            <tr key={index} className="">
                                <td className="border rounded-lg px-2 text-right" width="8%">
                                    {fixName(el.name)}
                                </td>
                                <td className="text-center " width="8%">
                                    {el.base_stat}
                                </td>
                                <td className="pl-1 align-middle" width="68%">
                                    <ProgressBar className={`align-items-center stat-bar ${calcPBar(el.base_stat, el.name)}`} now={(el.base_stat / 255) * 150} />
                                </td>
                                <td className="text-center" width="8%">
                                    {calcMin(el.base_stat, slider, el.name)}
                                </td>
                                <td className="text-center" width="8%">
                                    {calcMax(el.base_stat, slider, el.name)}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4">
                                <div className="small">
                                    *Does not factor in Pokémon nature
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </>
    )
}

export default Stats
