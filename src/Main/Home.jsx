import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import RandomPokemon from './Cards/RandomPokemon'

function Home() {
    return (
        <div>
            <div>
                <Jumbotron fluid className="d-flex align-items-center text-center home">
                    <Container className="banner-text rounded-lg p-3">
                        <h1>PokéDex</h1>
                        <p>
                            Your one stop pokedex
                        </p>
                    </Container>
                </Jumbotron>
            </div>
            <Container fluid>
                <Row className="justify-content-center">
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
            </Container>
        </div>
    )
}
export default Home
