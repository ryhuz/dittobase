import React, { useState, useEffect } from 'react'
import { Card, Col, Container } from 'react-bootstrap'
import Loading from '../Loading'

function CardData({ pokeData, genFilter }) {
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
                let tempGen = "";
                let x = result.data.id;
                switch (true) {
                    case (x <= 151):
                        tempGen = 'I';
                        break;
                    case (x <= 251):
                        tempGen = 'II';
                        break;
                    case (x <= 386):
                        tempGen = 'III';
                        break;
                    case (x <= 493):
                        tempGen = 'IV';
                        break;
                    case (x <= 649):
                        tempGen = 'V';
                        break;
                    case (x <= 721):
                        tempGen = 'VI';
                        break;
                    case (x <= 809):
                        tempGen = 'VII';
                        break;
                    case (x <= 898):
                        tempGen = 'VII';
                        break;
                    default:
                        tempGen = 'Others';
                        break;
                }
                setData({
                    id: result.data.id,
                    name: tempName,
                    img: result.data.sprites.other['official-artwork'].front_default,
                    gen: tempGen,
                })
                setLoad(false);
            })
    }, [])

    return (
        <>
            {genFilter === 'All' ?
                <Col md={3} xs={5} className="p-3 mx-auto">
                    <Card>
                        {loading ? <Loading /> : <div className="text-center pt-2">
                            <span>#{data.id} - <b>{data.name}</b></span>
                            <img className="p-3" width="100%" src={data.img} />
                        </div>
                        }
                    </Card>
                </Col> :
                genFilter === data.gen ?
                    <Col md={3} xs={5} className="p-3 mx-auto">
                        <Card>
                            {loading ? <Loading /> : <div className="text-center pt-2">
                                <span>#{data.id} - <b>{data.name}</b></span>
                                <img className="p-3" width="100%" src={data.img} />
                            </div>
                            }
                        </Card>
                    </Col> :
                    ""
            }

        </>
    )
}

export default CardData
