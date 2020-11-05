import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import RandomPokemon from './Cards/RandomPokemon'

function Home() {
    return (
        <div>
            <div>
                <Jumbotron fluid className="d-flex align-items-center text-center home">
                    <Container className="banner-text rounded-lg p-3">
                        <h1>Dittobase</h1>
                        <p>
                            The second-best Bulbapedia rip-off
                        </p>
                    </Container>
                </Jumbotron>
            </div>
            <Container>
                <h3>Random Pokémon</h3>
                <Row className="justify-content-center p-3">
                    <Col lg={3} md={4}>
                        <RandomPokemon />
                    </Col>
                    <Col lg={3} md={4}>
                        <RandomPokemon />
                    </Col>
                    <Col lg={3} md={4}>
                        <RandomPokemon />
                    </Col>
                </Row>
                <hr />
                <h3>Learn more about Ditto</h3>
                <Row className="d-flex justify-content-center p-3">
                    <Col xs={'auto'}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/-gKiKpZ_Rio" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Home
