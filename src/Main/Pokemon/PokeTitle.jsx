import React from 'react'
import { Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function PokeTitle({ id, name, gen, sprite }) {
    function chkFF(n){
        if (n.includes('arfetchd')){
            return n.replace('arfetchd', 'arfetch\'d')
        }else{
            return n;
        }
    }
    return (
        <Row className="mt-3" id="poke-title" xs={4} >
            <Col md={8} xs={12} md={{ order: 1 }}  className="d-flex border shadow py-2 pl-4 mx-auto">
                <div className="d-flex flex-column justify-content-center mr-4 text-center">
                    <h5><Badge variant="secondary" className="py-1 px-3" >#{id}</Badge></h5>
                    <div>Generation {gen}</div>
                </div>
                <div className="d-flex flex-column justify-content-center text-center">
                    <h2>{chkFF(name)}</h2>
                </div>
                <div className="ml-2">
                    <img src={sprite} className="mt-2" />
                </div>
            </Col>
            <Col md={2} xs={5} className="text-center d-flex flex-column align-items-center justify-content-center mx-auto">
                {id !== '1' &&
                    <Link to={`/pokemon/${Number(id) - 1}`}>
                        <div className="pl-2 mt-3">
                            Previous Pokémon
                        </div>
                        <div className="h2">
                            <FontAwesomeIcon icon={faLongArrowAltLeft} />
                        </div>
                    </Link>
                }
            </Col>
            
            <Col md={2} xs={5} xs={{ order: 'last' }} className="text-center d-flex flex-column align-items-center justify-content-center mx-auto">
                {id != 898 &&
                    <Link to={`/pokemon/${Number(id) + 1}`}>
                        <div className="pr-2 mt-3">
                            Next Pokémon
                        </div>
                        <div className="h2">
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </div>
                    </Link>
                }
            </Col>
        </Row>
    )
}

export default PokeTitle
