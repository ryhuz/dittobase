import React from 'react'

function TmNo({ name, tm, version }) {
    let index;
    /* if(tm){
        index = tm[version].findIndex(el => (el.move === name));
    } */
    console.log(tm[version]);

    return (
        <>
           {/*  {tm && tm[version][index].name} */}
        </>
    )
}

export default TmNo
