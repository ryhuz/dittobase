import React, { useState, useEffect } from 'react'
import { Card, Col, Container } from 'react-bootstrap'
import Loading from '../Loading'

function CardData({ pokeData }) {
    const [data, setData] = useState({
        id: "",
        name: pokeData.name,
        img: ""
    })
    const [loading, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true);
        let axios = require('axios');
        axios.get(pokeData.url)
            .then(result => {
                let temp = result.data.name;
                temp = temp[0].toUpperCase()+temp.slice(1);
                setData({
                    id: result.data.id,
                    name: temp,
                    img: result.data.sprites.other['official-artwork'].front_default
                })
                setLoad(false);
            })
    }, [])

    return (
        <Col md={3} xs={5} className="p-3 mx-auto">
            <Card>
                {loading ? <Loading/> : <div className="text-center pt-2">
                <span>#{data.id} - <b>{data.name}</b></span>
                <img className="p-3" width="100%" src={data.img} />
                </div>
                }
            </Card>
        </Col>
    )
}

export default CardData