import React from 'react'
import { Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function PokeTitle({ id, name, gen, sprite, type }) {
    function fixName(n) {
        return n[0].toUpperCase() + n.slice(1);
    }
    return (
        <Row className="mt-3" id="poke-title">
            <Col md={2} xs={3} className="text-center d-flex flex-column align-items-center justify-content-center">
                <div className="pl-2">
                    Previous Pokémon
                            </div>
                <div>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
            </Col>
            <Col md={8} xs={6} className="d-flex border shadow py-2 pl-4">
                <div className="d-flex flex-column justify-content-center mr-4 text-center">
                    <h5><Badge variant="secondary" className="py-1 px-3" >#{id}</Badge></h5>
                    <div>Generation {gen}</div>
                </div>
                <div className="d-flex flex-column justify-content-center text-center">
                    <h2>{name}</h2>
                    <div>
                        {type.map(t => (
                            <span className="mx-1">
                                <Badge variant={`type ${t}`} className="py-1 px-3 w-70">{fixName(t)}</Badge>
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <img src={sprite} />
                </div>
            </Col>
            <Col md={2} xs={3} className="text-center d-flex flex-column align-items-center justify-content-center">
                <div className="pr-2">
                    Next Pokémon
                            </div>
                <div>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </Col>
        </Row>
    )
}

export default PokeTitle
