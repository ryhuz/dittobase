import React from 'react'
import loading from '../../charmander_loading.gif'
import { Row, Col } from 'react-bootstrap'

function Loading() {
    return (
        <Row className='mx-auto justify-content-center'>
            <Col md={3}>
                <img width="100%" src={loading} />
            </Col>
        </Row>
    )
}

export default Loading