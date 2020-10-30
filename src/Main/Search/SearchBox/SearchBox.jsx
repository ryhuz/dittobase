import React, { useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import Attr from './Attr';
import Index from './Index';

function SearchBox({change}) {
    const [searchMethod, setSearchMethod] = useState('attr');

    function method(e) {
        setSearchMethod(e.target.name);
    }

    return (
        <div>
            <Container className="pb-3">
                <Nav variant="tabs" defaultActiveKey="attr">
                    <Nav.Item>
                        <Nav.Link eventKey="attr" name="attr" onClick={method}>Attribute Search</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="index" name="index" onClick={method}>Index Search</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <Container>
                {searchMethod === 'attr' ? <Attr change={change} /> : <Index change={change} />}
            </Container>
        </div>
    )
}

export default SearchBox
