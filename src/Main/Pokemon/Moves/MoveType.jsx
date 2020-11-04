import React, { useState, useEffect } from 'react'
import { Badge } from 'react-bootstrap';

function MoveType({ param, url }) {
    const [types, setTypes] = useState({})
    function fixName(n) {
        if (n) {
            return n[0].toUpperCase() + n.slice(1);
        }
    }
    function getTypes() {
        let axios = require('axios');
        if(url){
            axios.get(url)
            .then(res => {
                setTypes({
                    type: res.data.type.name,
                    class: res.data.damage_class.name,
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }
    function getLogo() {
        let x;
        switch (types.class) {
            case 'physical':
                x = require('./physical.png').default;
                break;
            case 'special':
                x = require('./special.png').default;
                break;
            case 'status':
                x = require('./other.png').default;
                break;
        }
        return x;
    }
    function showType() {
        if (param === 'type') {
            return (
                <Badge variant={`type ${types.type} moves`} className="py-1">{fixName(types.type)}</Badge>
            )
        } else {
            return (
                <img src={getLogo()} title={fixName(types.class)} />
            )
        }
    }

    useEffect(() => {
        getTypes();
    }, [])

    return (
        <>
            {showType()}
        </>
    )
}

export default MoveType
