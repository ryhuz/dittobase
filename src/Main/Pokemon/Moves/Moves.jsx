import React from 'react'
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import MovesTable from './MovesTable';

function Moves({ moves }) {
    let sortedMoves = [];
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
            if (ver.moves[0].method == 'egg') {
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
            if(name == 'xd'){
                return 'XD'
            }else if (name.split('-').length === 1) {
                return name[0].toUpperCase() + name.slice(1);
            }else if (name.split('-').length === 4){
                let temp = name.split('-');
                return temp[0][0].toUpperCase() + temp[0].slice(1) + ' ' + temp[1][0].toUpperCase() + temp[1].slice(1)  + '/' + temp[2][0].toUpperCase() + temp[2].slice(1) + ' ' + temp[3][0].toUpperCase() + temp[3].slice(1);
            }else {
                let temp = name.split('-');
                return temp[0][0].toUpperCase() + temp[0].slice(1) + '/' + temp[1][0].toUpperCase() + temp[1].slice(1);
            }
            return '';
        }
        return (
            <div id="moves">
                <Tab.Container defaultActiveKey={sortedMoves[0].name}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {sortedMoves.map((el, index) => (
                                    <Nav.Item key={index} className={el.name}>
                                        <Nav.Link eventKey={el.name} className={el.name}>{fixVerName(el.name)}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {sortedMoves.map((el, index) => (
                                    <Tab.Pane eventKey={el.name}>
                                        <MovesTable list={el.moves} key={index} />
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }

    console.log(sortedMoves);
    generateMoves();
    return (
        <>
            <table className="table table-hover border rounded-lg">
                <thead className="border rounded-lg">
                    <tr className="border rounded-lg">
                        <th colspan="2" scope="col" className="border rounded-lg text-center"><div>Moves</div></th>
                    </tr>
                </thead>
            </table>
            {generateMoves()}
        </>
    )
}

export default Moves
