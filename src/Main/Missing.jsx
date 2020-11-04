import React from 'react'
import { Row, Col, Badge, Table, Container } from 'react-bootstrap';

function Missing() {
    let img = require('./MissingNo/722.png').default;
    let sprite = require('./MissingNo/Missingno_Y.png').default;
    return (
        <div>
            <Row className="mt-3" xs={4} >
                <Col md={8} xs={12} className="d-flex border shadow py-2 pl-4 mx-auto">
                    <div className="d-flex flex-column justify-content-center mr-4 text-center">
                        <h5><Badge variant="secondary" className="py-1 px-3" >#???</Badge></h5>
                        <div>Generation ??</div>
                    </div>
                    <div className="d-flex flex-column justify-content-center text-center">
                        <h2>MissingNo.</h2>
                    </div>
                    <div className="ml-2">
                        <img src={sprite} width="70px" className="mt-2" />
                    </div>
                </Col>
            </Row>
            <Container className="mt-4 px-5" id="poke-body">
                <hr />
                <Row>
                    <Col md={5}>
                        <div className="mt-2">
                            <img src={img} width="70%" className="ml-5" />
                        </div>
                    </Col>
                    <Col md={3}>
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
                                        <span>
                                            <Badge variant='pill' className="py-1">???</Badge>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Abilities</td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Height</td>
                                    <td>?? m</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>?? kg</td>
                                </tr>
                                <tr>
                                    <td>Shape</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Habitat</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={3}>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th colSpan="2">Training</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Capture Rate</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Base EXP</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Growth Rate</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Missing
