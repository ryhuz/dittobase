import React, { useEffect, useState } from 'react'
import { Tab, Nav, Table, Col } from 'react-bootstrap';
import MovesTable from './MovesTable';

function Moves({ moves, movesInfo }) {
    let sortedMoves = [];
    const [fullInfo, setFullInfo] = useState([]);
    let urls = [];
    let tmURL = [];
    const [tmInfo, setTmInfo] = useState({});
    let axios = require('axios');


    function fullMoves() {
        movesInfo.forEach(x => {
            let temp = axios.get(x.url);
            urls.push(temp);
        })

        axios.all(urls)
            .then(r => {
                let tempFullInfo = [];
                r.forEach((x, index) => {
                    if (x.data.name !== movesInfo[index].name) {
                        console.log('number ', index, "' names don't match'");
                    } else {
                        tempFullInfo.push({ ...movesInfo[index], dmg_class: x.data.damage_class.name, type: x.data.type.name, machines: x.data.machines })
                    }
                })

                // do the same to get TM info
                tempFullInfo.forEach(x => {
                    x.machines.forEach(y => {
                        let temp = axios.get(y.machine.url);
                        tmURL.push(temp);
                    })
                })

                axios.all(tmURL)
                    .then(res => {
                        let tempTMInfo = {};
                        res.forEach((x) => {
                            if (!tempTMInfo.hasOwnProperty(x.data.version_group.name)) {
                                tempTMInfo[x.data.version_group.name] = [];
                            }
                            tempTMInfo[x.data.version_group.name].push({ name: x.data.item.name, move: x.data.move.name });
                        })

                        for (const j in tempTMInfo) {
                            tempTMInfo[j].sort((a, b) => (a.name > b.name) ? 1 : -1)
                        }
                        setTmInfo(tempTMInfo);
                    })
                setFullInfo(tempFullInfo);
            }).catch(err => {
            })
    }

    function sortByVersion() {
        let order = [
            "red-blue", "yellow", "gold-silver", "crystal",
            "ruby-sapphire", "emerald", "firered-leafgreen", "diamond-pearl",
            "platinum", "heartgold-soulsilver", "black-white", "colosseum", "xd",
            "black-2-white-2", "x-y", "omega-ruby-alpha-sapphire", "sun-moon",
            "ultra-sun-ultra-moon", "lets-go", "sword-shield"
        ]
        function sortMoveLearnMethod(list) {
            let sortedMethod = [];
            let methodOrder = ['egg', 'level-up', 'machine', 'tutor'];
            methodOrder.forEach(m => {
                if (list.hasOwnProperty(m)) {
                    sortedMethod.push({ method: m, moves: list[m] });
                }
            })
            return sortedMethod;
        }
        order.forEach(v => {
            if (moves.hasOwnProperty(v)) {
                sortedMoves.push({ name: v, moves: sortMoveLearnMethod(moves[v]) })
            }
        })
    }
    function sortMoveLevel() {
        let temp;
        sortedMoves.forEach((ver, index) => {
            let indexOfLevel = 0;
            if (ver.moves[0].method === 'egg') {
                temp = ver.moves[1].moves;
                indexOfLevel = 1;
            } else {
                temp = ver.moves[0].moves;
            }
            temp.sort(function (a, b) {
                if (a.level === b.level) {
                    return a.name[0] - b.name[0];
                } else {
                    return a.level - b.level;
                }
            })
            sortedMoves[index].moves[indexOfLevel].moves = temp;
        })
    }

    sortByVersion();
    sortMoveLevel();
    function generateMoves() {
        function fixVerName(name) {
            if (name === 'xd') {
                return 'XD'
            } else if (name.split('-').length === 1) {
                return name[0].toUpperCase() + name.slice(1);
            } else if (name.split('-').length === 4) {
                let temp = name.split('-');
                return temp[0][0].toUpperCase() + temp[0].slice(1) + ' ' + temp[1][0].toUpperCase() + temp[1].slice(1) + '/' + temp[2][0].toUpperCase() + temp[2].slice(1) + ' ' + temp[3][0].toUpperCase() + temp[3].slice(1);
            } else {
                let temp = name.split('-');
                return temp[0][0].toUpperCase() + temp[0].slice(1) + '/' + temp[1][0].toUpperCase() + temp[1].slice(1);
            }
            return '';
        }
        return (
            <>
                <td width="4%">
                    <Nav variant="pills" className="flex-column">
                        {sortedMoves.map((el, index) => (
                            <Nav.Item key={index} className={el.name}>
                                <Nav.Link eventKey={el.name} className={el.name}>{fixVerName(el.name)}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </td>
                <td>
                    <Tab.Content>
                        {sortedMoves.map((el, index) => (
                            <Tab.Pane eventKey={el.name} key={index}>
                                <MovesTable list={el.moves} movesInfo={fullInfo} tm={tmInfo[el.name]} />
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </td>
            </>
        )
    }
    generateMoves();
    useEffect(() => {
        fullMoves()
    }, [])

    return (
        <Col className="mt-3">
            <h3 className="ml-3">Moves</h3>
            <div id="moves">
                <Tab.Container defaultActiveKey={sortedMoves[0].name}>
                    <Table>
                        <tr>
                            {Object.keys(tmInfo).length ? generateMoves() : 'Loading...'}
                        </tr>
                    </Table>
                </Tab.Container>
            </div>
        </Col>
    )
}

export default Moves
