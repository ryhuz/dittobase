import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap'

import {testerPokemon} from '../../TestApi/Test' //delete later

function RandomPokemon() {
    const [randPoke, newRandPoke] = useState({name: "", pic: "",});

    /* 
        useEffect(() => {
            let axios = require('axios');
            let pokedex = 'https://pokeapi.co/api/v2/';
            let random = (Math.floor(Math.random() * 892)+1)
            axios.get(`${pokedex}pokemon/${random}`)
                .then(result => {
                    newRandPoke(result.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }, []); */
    
        useEffect(() => {
            let name = testerPokemon.name[0].toUpperCase() + testerPokemon.name.slice(1);
            newRandPoke({name, pic: testerPokemon.sprites.other['official-artwork'].front_default});
        }, [])

        

    return (
        <Container>
            <Card className="p-3">
                <img width="100%" src = {randPoke.pic} />
                <div className="h4 text-center">{randPoke.name}</div>
            </Card>
        </Container>
    )
}

export default RandomPokemon
