import React, { useState, useEffect } from 'react'
import { Col, Card } from 'react-bootstrap'
import CardData from './CardData'

function ResultCard({ data }) {
    const [cardData, setCardData] = useState({})

    useEffect(() => {
        let axios = require('axios');
        axios.get(data)
            .then(result => {
                setCardData(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Col md={3} className="p-3">
            <Card>
                {cardData && <CardData data={cardData}/>}
            </Card>
        </Col>
    )
}

export default ResultCard
