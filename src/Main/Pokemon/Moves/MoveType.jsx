import React from 'react'
import { Badge } from 'react-bootstrap';

function MoveType({ param, movesInfo, name }) {
    function fixName(n) {
        if (n) {
            return n[0].toUpperCase() + n.slice(1);
        }
    }

    let index = movesInfo.findIndex(el=>{
        return el.name == name});
    
    function getLogo() {
        let x;
        switch (index > 0 ? movesInfo[index].dmg_class : false) {
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
                <Badge variant={`type ${index > 0 && movesInfo[index].type} moves`} className="py-1">{fixName(index > 0 ? movesInfo[index].type : "")}</Badge>
            )
        } else {
            return (
                <img src={getLogo()} title={fixName(index > 0 ? movesInfo[index].dmg_class : "")} />
            )
        }
    }
    return (
        <>
            {showType()}
        </>
    )
}

export default MoveType
