import React from 'react'
import { Form } from 'react-bootstrap'


function Index({change}) {
    return (
        <Form className="row pl-4">
            <Form.Group controlId="search-pokemon" className="col-3">
                <Form.Label>From Index<span className="small">(min 1)</span></Form.Label>
                <Form.Control type="number" name="indexStart" onChange={change} min="1" />
            </Form.Group>
            <Form.Group controlId="search-pokemon" className="col-3">
                <Form.Label>To Index <span className="small">(max 898)</span></Form.Label>
                <Form.Control type="number" name="indexEnd" onChange={change} min="1" />
            </Form.Group>
        </Form>
    )
}

export default Index
