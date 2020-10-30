import React from 'react'

function CardData({data}) {
    let name = "";
    let img  = "";
    if(data.name){
        name = data.name[0].toUpperCase()+data.name.slice(1);
        img = data.sprites.other['official-artwork'].front_default;
    }
    return (
        <div className="p-4">
            <span className="p-4 h5">
                #{data.id} - {name}
            </span>
                <img width="90%" src={img} />
        </div>
    )
}

export default CardData
