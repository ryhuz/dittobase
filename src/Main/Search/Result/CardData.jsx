import React, { useState, useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'
import Loading from '../Loading'
import { Link } from 'react-router-dom'

function CardData({ pokeData }) {
    const [data, setData] = useState({
        id: "",
        name: pokeData.name,
        img: "",
        gen: "",
    })
    const [loading, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true);
        let axios = require('axios');
        axios.get(pokeData.url)
            .then(result => {
                let tempName = result.data.name;
                tempName = tempName[0].toUpperCase() + tempName.slice(1);
                let tempImg = "";
                try {
                    tempImg = require(`../../../sprites/pokemon/other/official-artwork/${result.data.id}.png`).default;
                } catch (err) {
                    tempImg = "";
                    console.log(err);
                }
                
                setData({
                    id: result.data.id,
                    name: tempName,
                    img: tempImg,
                })
                setLoad(false);
            })
    }, [])

    return (
        <>
            <Col md={3} xs={5} className="p-3 mx-auto">
                <Card>
                    {loading ? <Loading /> : <div className="text-center pt-2">
                        <Link to={`/pokemon/${data.id}`}><span>#{data.id} - <b>{data.name}</b></span></Link>
                        <Link to={`/pokemon/${data.id}`}><img className="p-3" width="100%" src={data.img} /></Link>
                    </div>
                    }
                </Card>
            </Col>
        </>
    )
}

export default CardData
