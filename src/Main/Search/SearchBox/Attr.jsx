import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

function Attr({change}) {
    return (
        <Form className="row pl-4">
                <Form.Group controlId="search-pokemon" className="col-6">
                    <Form.Label>by Pokémon Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={change} />
                </Form.Group>
                <Form.Group controlId="filter-type" className="col-3">
                    <Form.Label>Filter by Type</Form.Label>
                    <Form.Control as="select" name="type" onChange={change}>
                        <option>All</option>
                        <option>Water</option>
                        <option>Fire</option>
                        <option>Grass</option>
                        <option>Bug</option>
                        <option>Poison</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="filter-gen" className="col-3">
                    <Form.Label>Filter by Generation</Form.Label>
                    <Form.Control as="select" name="gen" onChange={change}>
                        <option>All</option>
                        <option>I</option>
                        <option>II</option>
                        <option>III</option>
                        <option>IV</option>
                        <option>V</option>
                    </Form.Control>
                </Form.Group>
            </Form>
    )
}

export default Attr
