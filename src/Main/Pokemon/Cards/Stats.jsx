import React, { useState } from 'react'
import { Table, Col } from 'react-bootstrap';

function Stats({ stats }) {
    const [sliderNStats, setLevelSlider] = useState({
        slider: 1,
        stats: [
            { name: 'hp', base_stat: stats[0].base_stat, },
            { name: 'attack', base_stat: stats[1].base_stat, },
            { name: 'defense', base_stat: stats[2].base_stat, },
            { name: 'special-attack', base_stat: stats[3].base_stat, },
            { name: 'special-defense', base_stat: stats[4].base_stat, },
            { name: 'speed', base_stat: stats[5].base_stat, },
        ]
    });
    function fixName(name) {
        let n = name.replace('special', 'sp');
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
        setLevelSlider({
            slider: e.target.value,
            stats: [
                { name: 'hp', base_stat: stats[0].base_stat * e.target.value, },
                { name: 'attack', base_stat: stats[1].base_stat * e.target.value, },
                { name: 'defense', base_stat: stats[2].base_stat * e.target.value, },
                { name: 'special-attack', base_stat: stats[3].base_stat * e.target.value, },
                { name: 'special-defense', base_stat: stats[4].base_stat * e.target.value, },
                { name: 'speed', base_stat: stats[5].base_stat * e.target.value, },
            ]
        });
    }
    function calcStats(base, level){
        // DO CALCULATIONS HERE FOR MIN AND MAX AND RETURN AS STRING
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
                                <span className="py-2">Stats at Level {sliderNStats.slider}</span>
                                <input type="range" min="1" max="100" value={sliderNStats.slider} onChange={onSlide} id="slider" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sliderNStats.stats.map((el, index) => (
                            <tr key={index} className="border rounded-lg">
                                <td className="border rounded-lg px-2" width="12%">
                                    {fixName(el.name)}
                                </td>
                                <td className="text-center " width="8%">
                                    {el.base_stat}
                                </td>
                                <td className="pl-1" width="64%">
                                    progress bar
                                </td>
                                <td className="text-center" width="8%">
                                    calc
                                </td>
                                <td className="text-center" width="8%">
                                    calc
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Col>


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
