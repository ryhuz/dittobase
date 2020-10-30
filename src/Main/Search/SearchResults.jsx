import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import ResultCard from './ResultCard';

import { res } from '../../TestApi/SearchRes' // delete later

function SearchResults({ searchParam }) {
    let limit = 6;
    const [pokeResults, setPokeResults] = useState([]);

    /* useEffect(() => {
        let axios = require('axios');
        let pokedex = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
        axios.get(pokedex)
            .then(result => {
                setPokeResults(result.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []); */
    useEffect(() => {
        setPokeResults(res.results);
    }, [])

    console.log(pokeResults);
    return (
        <Container>
            <Row>
                {pokeResults.map(() => (
                    <ResultCard />
                ))}
            </Row>
        </Container>
    )
}

export default SearchResults
