import React, { useState, useEffect } from 'react'
import { Col, Card } from 'react-bootstrap'
import CardData from './CardData'

function ResultCard({ data }) {
    const [cardData, setCardData] = useState({})

    return (
        <Col md={3} className="p-3">
            <Card>
                {cardData && <CardData data={cardData}/>}
            </Card>
        </Col>
    )
}

export default ResultCard
