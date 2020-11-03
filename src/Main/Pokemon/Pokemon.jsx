import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Description from './Cards/Description';
import Stats from './Cards/Stats';
import Moves from './Moves/Moves';
import PokeTitle from './PokeTitle';
import Evolution from './Cards/Evolution';
import PokeDex from './Cards/PokeDex';
import Training from './Cards/Training';

function Pokemon() {
    // https://pokeapi.co/api/v2/pokemon-species/1/ for description, evolution chain
    // https://pokeapi.co/api/v2/pokemon/1/ for move list, sprites, stats, types

    let { id } = useParams();
    let gen = "";
    switch (true) {
        case (id <= 151):
            gen = 'I';
            break;
        case (id <= 251):
            gen = 'II';
            break;
        case (id <= 386):
            gen = 'III';
            break;
        case (id <= 493):
            gen = 'IV';
            break;
        case (id <= 649):
            gen = 'V';
            break;
        case (id <= 721):
            gen = 'VI';
            break;
        case (id <= 809):
            gen = 'VII';
            break;
        case (id <= 898):
            gen = 'VII';
            break;
        default:
            gen = 'Others';
            break;
    }

    const [thisPokeData, setThisPokeData] = useState({
        abilities: [],
        base_exp: "",
        capture_rate: "",
        desc: [],
        evo: [],
        growth_rate: "",
        habitat: "",
        height: "",
        id: "",
        img: "",
        moves: [],
        movesInfo: [],
        name: "",
        shape: "",
        sprite: "",
        stats: [],
        type: [],
        weight: "",
        loading: false,
    });

    function getPokeData() {
        let axios = require('axios');
        let data1 = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data2 = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        //axios block goes here -----------------------------------------------------------------------------------------------
        axios.all([data1, data2])
            .then(axios.spread((...res) => {
                let tempDesc = [];
                let tempMoves = {};
                let tempMovesInfo = []
                let tempImg = "";
                let tempSprite = "";
                try {
                    tempImg = require(`../../sprites/pokemon/other/official-artwork/${id}.png`).default;
                } catch (err) {
                    tempImg = "";
                    console.log(err);
                }
                try {
                    tempSprite = require(`../../sprites/pokemon/${id}.png`).default;
                } catch (err) {
                    tempSprite = "";
                    console.log(err);
                }
                function getDesc() {
                    let allDesc = res[1].data.flavor_text_entries.filter(x => x.language.name === 'en')
                    allDesc.forEach(x => {
                        let includes = false;
                        tempDesc.forEach(y => {
                            if (y.flavor_text === x.flavor_text) {
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
                    tempMovesInfo.push({ name: move.move.name, url: move.move.url, })
                    move.version_group_details.forEach(version => {
                        function propertyChk(ver, meth) {
                            if (!tempMoves.hasOwnProperty(ver)) {
                                tempMoves[ver] = {};
                            }
                            if (!tempMoves[ver].hasOwnProperty(meth)) {
                                tempMoves[ver][meth] = [];
                            }
                        }
                        if (version.move_learn_method.name === 'egg') {
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push({ name: move.move.name });
                        } else if (version.move_learn_method.name === 'level-up') {
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push({ name: move.move.name, level: version.level_learned_at })
                        } else if (version.move_learn_method.name === 'machine') {
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push({ name: move.move.name, url: version.move_learn_method.url });
                        } else if (version.move_learn_method.name === 'tutor') {
                            propertyChk(version.version_group.name, version.move_learn_method.name);
                            tempMoves[version.version_group.name][version.move_learn_method.name].push({ name: move.move.name })
                        } else {
                        }
                    })
                })
                getDesc();
                setThisPokeData({
                    abilities: res[0].data.abilities,
                    base_exp: res[0].data.base_experience,
                    capture_rate: res[1].data.capture_rate,
                    desc: tempDesc,
                    evo: res[1].data.evolution_chain.url,
                    growth_rate: res[1].data.growth_rate.name,
                    habitat: res[1].data.habitat.name,
                    height: res[0].data.height,
                    id: res[0].data.id,
                    img: tempImg,
                    moves: tempMoves,
                    movesInfo: tempMovesInfo,
                    name: res[0].data.name[0].toUpperCase() + res[0].data.name.slice(1),
                    shape: res[1].data.shape.name,
                    sprite: tempSprite,
                    stats: res[0].data.stats.map(x => {
                        return { name: x.stat.name, base_stat: x.base_stat }
                    }),
                    type: res[0].data.types.map(x => x.type.name),
                    weight: res[0].data.weight,
                    loading: true,
                })
            })).catch(err => {
                console.log(err);
            })
        //--------------------------------------------------------------------------------------------------------------------------
    }
    useEffect(() => {
        getPokeData();
    }, [id])
    return (
        <>
            {thisPokeData.loading && <>
                <PokeTitle id={thisPokeData.id} name={thisPokeData.name} gen={gen} sprite={thisPokeData.sprite}/>
                <Container className="mt-4" id="poke-body">
                    <hr />
                    <Row>
                        <Col md={5}>
                            <div className="mt-2">
                                <img src={thisPokeData.img} width="70%" className="ml-5"/>
                            </div>
                        </Col>
                        <Col md={3}>
                            <PokeDex abilities={thisPokeData.abilities} height={thisPokeData.height} weight={thisPokeData.weight} type={thisPokeData.type} shape={thisPokeData.shape} habitat={thisPokeData.habitat} />
                        </Col>
                        <Col md={3}>
                            <Training base_exp={thisPokeData.base_exp} capture_rate={thisPokeData.capture_rate} growth_rate={thisPokeData.growth_rate} />
                        </Col>
                    </Row>
                    <Row>
                        <Stats stats={thisPokeData.stats} />
                    </Row>
                    <Row>
                        <Evolution chain={thisPokeData.evo}/>
                    </Row>
                    <Row>
                        <Description desc={thisPokeData.desc} />
                    </Row>
                    <Moves moves={thisPokeData.moves} movesInfo={thisPokeData.movesInfo} />
                </Container>
            </>}
        </>
    )
}

export default Pokemon

/*
function getPokeEvo() {
                    let tempEvo = [];
                    axios.get(res[1].data.evolution_chain.url)
                        .then(evo => {
                            let x = evo.data.chain
                            tempEvo.push({ name: x.species.name, url: x.species.url.split('/')[6], curr: (x.species.name == res[0].data.name) });
                            function checkEvoBranch(evolv, stage = 1) {
                                while (evolv.length) {
                                    if (!tempEvo[stage]) {
                                        tempEvo[stage] = [];
                                    }
                                    evolv.forEach(p => {
                                        function getTrigger(t) {
                                            let temp;
                                            if(t.trigger){
                                                if (t.trigger.name == 'level-up') {
                                                    temp = { name: t.min_level && `Level ${t.min_level}`, holding: t.item && t.item.name.split('-').forEach(x => x[0].toUpperCase() + x.slice(1)).join(' ') }
                                                } else if (t.trigger.name == 'trade') {
                                                    temp = { name: `Trade`, holding: t.item && t.item.name.split('-').forEach(x => x[0].toUpperCase() + x.slice(1)).join(' ') }
                                                } else if (t.trigger.name == 'use-item') {
                                                    temp = { name: t.item.split('-').forEach(x => x[0].toUpperCase() + x.slice(1)).join(' ') }
                                                }
                                            }
                                            return temp;
                                        }
                
                                        tempEvo[stage].push({ name: p.species.name, url: p.species.url.split('/')[6], curr: (p.species.name == res[0].data.name), trigger: getTrigger(p.evolution_details), })
                                        checkEvoBranch(p.evolves_to, stage + 1);
                                    })
                                }
                            }
                            checkEvoBranch(x.evolves_to);
                        }).catch()
                }
*/


function showEvo() {
    /* let from = require(`../sprites/pokemon/${Number(id) - 1}.png`).default
    let to = require(`../sprites/pokemon/${Number(id) + 1}.png`).default
    return (
        <Container>
            <CardDeck>
                <Card className="evo-card">
                    <Card.Img variant="top" src={from} />
                    <Card.Footer className="text-center">
                        <small className="text-muted">Bulbasaur</small>
                    </Card.Footer>
                </Card>
                <div className="d-flex align-items-center">
                    <Card.Text>
                        Evolves at
                        <div>
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </div>
                    </Card.Text>
                </div>
                <Card className="evo-card">
                    <Card.Img variant="top" src={thisPokeData.sprite} />
                    <Card.Footer className="text-center">
                        <small className="text-muted">Ivysaur</small>
                    </Card.Footer>
                </Card>
                <div>
                    <Card.Text>
                        Evolves at
                        <div>
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </div>
                    </Card.Text>
                </div>
                <Card className="evo-card">
                    <Card.Img variant="top" src={to} />
                    <Card.Footer className="text-center">
                        <small className="text-muted">Venusaur</small>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </Container>
    ) */
}
