import React, { useState } from 'react'
import { Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function RandomPokemon() {
    // let key = process.env.REACT_APP_API_KEY
    // let axios = require('axios');
    // const [no, setNo] = useState(0);
    let no = Math.floor(Math.random()*897)+1;
    let img;
    try{
        img = require(`../../sprites/pokemon/other/official-artwork/${no}.png`).default;
    }catch{
        img = "";
    }
/* 
    axios.get('https://api.random.org/json-rpc/2/invoke')
    .then(r=>{

    }).catch(e=>{
        setNo()
        let img = require(`../../sprites/pokemon/other/official-artwork/${no}.png`).default;
    })
 */
    return (
        <Container>
            <Link to={`/pokemon/${no}`}>
                <Card className="p-3">
                    <img width="100%" src={img} />
                </Card>
            </Link>
        </Container>
    )
}

export default RandomPokemon
