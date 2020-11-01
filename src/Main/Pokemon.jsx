import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Pokemon() {
    // https://pokeapi.co/api/v2/pokemon-species/1/ for description, evolution chain
    // https://pokeapi.co/api/v2/pokemon/1/ for move list, sprites, stats, types

    let { id } = useParams();
    const [thisPokeData, setThisPokeData] = useState({
        name: "",
        sprite: "",
        height: "",
        weight: "",
        img: "",
        desc: "",
        evo: [],
        moves: [],
        stats: [],
        type: [],
    });

    function getPokeData() {
        let axios = require('axios');
        let data1 = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data2 = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        axios.all([data1, data2])
            .then(axios.spread((...res) => {
                console.log(res[0].data.moves);
                let tempDesc = [];
                let tempMoves = {
                    //versiongroup: {
                    //method: {
                    //move: {name, url}
                    //}
                    //}
                };
                let testArr = [];
                function getDesc() {
                    let allDesc = res[1].data.flavor_text_entries.filter(x => x.language.name == 'en')
                    allDesc.forEach(x => {
                        let includes = false;
                        tempDesc.forEach(y => {
                            if (y.flavor_text == x.flavor_text) {
                                includes = true;
                                if (typeof y.version == "object") {
                                    y.version = [y.version, x.version];
                                } else {
                                    y.version.push(x.version);
                                }
                            }
                        })
                        if (!includes) {
                            tempDesc.push(x);
                        }
                    })
                }
                res[0].data.moves.forEach(move => {
                    move.version_group_details.forEach(version => {
                        function propertyChk(ver, meth) {
                            if (!tempMoves.hasOwnProperty(ver)) {
                                tempMoves[ver] = {};
                            }
                            if (!tempMoves[ver].hasOwnProperty(meth)) {
                                tempMoves[ver][meth] = [];
                            }
                        }
                        
                        if (version.move_learn_method.name == 'egg') {
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push(move.move.name);
                        } else if (version.move_learn_method.name == 'level-up') {
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push({ name: move.move.name, level: version.level_learned_at })
                        } else if (version.move_learn_method.name == 'machine') {
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push({ name: move.move.name, url: version.move_learn_method.url });
                        } else if (version.move_learn_method.name == 'tutor') {
                            console.log("from tutor" , move.move.name, ' at ',  version.version_group.name);
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push(move.move.name)
                        }else{
                        }
                    })
                })

                /* 
                                if (version.move_learn_method.name == 'egg') {
                                    tempMoves[version.version_group.name][version.move_learn_method.name] = move.move.name;
                                } else if (version.move_learn_method.name = 'machine') {
                                    tempMoves[version.version_group.name][version.move_learn_method.name] = move.move;
                                } else if (version.move_learn_method.name = 'level-up') {
                                    tempMoves[version.version_group.name][version.move_learn_method.name] = { name: move.move.name, level: version.level_learned_at }
                                } else if (version.move_learn_method.name = 'tutor') {
                                    tempMoves[version.version_group.name][version.move_learn_method.name] = move.move.name
                                } */


                console.log(tempMoves);

                //getDesc();
                /* 
                setThisPokeData({
                    name: res[0].data.name,
                    sprite: ,
                    img: ,
                    height: res[0].data.height,
                    weight: res[0].data.weight,
                    type: res[0].data.types.map(x=>x.type.name),
                    moves: ,
                    stats: res[0].data.stats.map(x=>{
                        return {name:x.stat.name, base_stat: x.stat.base_stat}
                    }),
                    desc: tempDesc,
    
                })
     */

            })).catch(err => {

            })
    }


    useEffect(() => {
        getPokeData();
    }, [])

    return (
        <div>
            <h4>Index</h4>
            <h2>Pokemon Name</h2>sprite
            <h4>Generation</h4>
            picture  - description
            evolution chain
            stats - moves
        </div>
    )
}

export default Pokemon
