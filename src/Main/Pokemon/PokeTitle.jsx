import React from 'react'
import { Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function PokeTitle({ id, name, gen, sprite }) {
    return (
        <Row className="mt-3" id="poke-title">
            <Col md={2} xs={3} className="text-center d-flex flex-column align-items-center justify-content-center">
                {id !== '1' &&
                    <>
                        <div className="pl-2">
                            Previous Pokémon
                        </div>
                        <div className="h2">
                            <Link to={`/pokemon/${Number(id) - 1}`}><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
                        </div>
                    </>
                }
            </Col>
            <Col md={8} xs={6} className="d-flex border shadow py-2 pl-4">
                <div className="d-flex flex-column justify-content-center mr-4 text-center">
                    <h5><Badge variant="secondary" className="py-1 px-3" >#{id}</Badge></h5>
                    <div>Generation {gen}</div>
                </div>
                <div className="d-flex flex-column justify-content-center text-center">
                    <h2>{name}</h2>
                </div>
                <div>
                    <img src={sprite} />
                </div>
            </Col>
            <Col md={2} xs={3} className="text-center d-flex flex-column align-items-center justify-content-center">
                {id != 898 &&
                    <>
                        <div className="pr-2">
                            Next Pokémon
                        </div>
                        <div className="h2">
                            <Link to={`/pokemon/${Number(id) + 1}`}><FontAwesomeIcon icon={faLongArrowAltRight} /></Link>
                        </div>
                    </>
                }
            </Col>
        </Row>
    )
}

export default PokeTitle
