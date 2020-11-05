import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'

function About() {
    return (
        <div>
            <Jumbotron fluid className="d-flex align-items-center text-center about">
                <Container className="banner-text rounded-lg p-3">
                    <h1>About Us</h1>
                </Container>
            </Jumbotron>
            <Container>
                <p>
                <h3>Creator</h3> : Shawn Wee, for GA SEI-25 Project 2
                </p>
                <p>
                <b>Using</b> :
                <ul>
                    <li>PokéAPI</li>
                    <li>Sprites</li>
                    <li>React</li>
                    <li>React-Router</li>
                    <li>Bootstrap/Bootstrap React</li>
                </ul>
                </p>
            </Container>
        </div>
    )
}

export default About
