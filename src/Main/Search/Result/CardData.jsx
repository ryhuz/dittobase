import React from 'react'

function CardData({ data }) {

    return (
        <div className="p-4">
            <span className="p-4 h5">
                #{data.id} - {data.name}
            </span>
            <img width="90%" src={data.img} />
        </div>
    )
}

export default CardData
