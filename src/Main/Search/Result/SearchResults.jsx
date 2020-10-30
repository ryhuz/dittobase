import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import ResultCard from './ResultCard';

import { res } from '../../../TestApi/SearchRes' // delete later

function SearchResults({ searchParam }) {
    let pokemon = "https://pokeapi.co/api/v2/";
    let limit = 20;
    const [pokeResults, setPokeResults] = useState([]); //need to set a state for the filters as well
    let getType = "";
    let getGen = ""

    switch (searchParam.attr.type) {
        case 'Normal':
            getType = 'type/1/'
            break;
        case 'Fighting':
            getType = 'type/2/'
            break;
        case 'Flying':
            getType = 'type/3/'
            break;
        case 'Poison':
            getType = 'type/4/'
            break;
        case 'Ground':
            getType = 'type/5/'
            break;
        case 'Rock':
            getType = 'type/6/'
            break;
        case 'Bug':
            getType = 'type/7/'
            break;
        case 'Ghost':
            getType = 'type/8/'
            break;
        case 'Steel':
            getType = 'type/9/'
            break;
        case 'Fire':
            getType = 'type/10/'
            break;
        case 'Water':
            getType = 'type/11/'
            break;
        case 'Grass':
            getType = 'type/12/'
            break;
        case 'Electric':
            getType = 'type/13/'
            break;
        case 'Psychic':
            getType = 'type/14/'
            break;
        case 'Ice':
            getType = 'type/15/'
            break;
        case 'Dragon':
            getType = 'type/16/'
            break;
        case 'Dark':
            getType = 'type/17/'
            break;
        case 'Fairy':
            getType = 'type/18/'
            break;
        case 'Unknown':
            getType = 'type/10001/'
            break;
        case 'Shadow':
            getType = 'type/10002/'
            break;
        default :
            getType = ''
    }

    useEffect(() => {
        let axios = require('axios');
        axios.get(`${pokemon}${getType ? getType : 'pokemon'}?limit=${limit}`)
            .then(result => {
                if (getType) {
                    console.log("type");
                    setPokeResults(result.data.pokemon);
                } else {
                    console.log("all");
                    setPokeResults(result.data.results);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    console.log(searchParam);
    return (
        <Container>
            <Row>
                {pokeResults.map((el, index) => (
                    <ResultCard data={el.url} key={index} />
                ))}
            </Row>
        </Container>
    )
}

export default SearchResults
