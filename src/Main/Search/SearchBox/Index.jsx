import React from 'react'
import { Form } from 'react-bootstrap'


function Index({change}) {
    return (
        <Form className="row pl-4">
            <Form.Group controlId="search-pokemon" className="col-3">
                <Form.Label>By Index</Form.Label>
                <Form.Control type="text" name="indexStart" onChange={change}/>
            </Form.Group>
            <Form.Group controlId="search-pokemon" className="col-3">
                <Form.Label>By Index</Form.Label>
                <Form.Control type="text" name="indexEnd" onChange={change}/>
            </Form.Group>
        </Form>
    )
}

export default Index
