import React, { useState, useEffect } from 'react'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

function Evolution({ chain, currPoke, id }) {
    const [evolution, setEvolution] = useState([{
        name: currPoke,
        id,
        img: getImg(id),
        this: true,
    }])
    function chkFF(n) {
        let temp = n[0].toUpperCase() + n.slice(1);
        if (temp.includes('arfetchd')) {
            return temp.replace('arfetchd', 'arfetch\'d')
        } else {
            return temp;
        }
    }

    function getImg(i) {
        let tempSprite = "";
        try {  // get sprite
            tempSprite = require(`../../../sprites/pokemon/${i}.png`).default;
        } catch (er) {
            try {
                tempSprite = require(`../../../sprites/pokemon/${i}.png`).default;
            } catch (e) {
                console.log('2nd evo sprite not found. No sprite')
                tempSprite = "";
            }
            console.log('1st evo sprite not found.')
        }
        return tempSprite;
    }
    function getEvoChain() {
        let axios = require('axios');

        axios.get(chain)
            .then(evo => {
                let temp = [];
                let tempID = evo.data.chain.species.url.split('/')[6];
                temp.push({ name: evo.data.chain.species.name, id: tempID, img: getImg(tempID), this: (currPoke.toLowerCase() === evo.data.chain.species.name), });
                function checkEvoBranch(evolv, stage = 1) {
                    if (evolv.length !== 0) {
                        if (!temp[stage]) {
                            temp[stage] = [];
                        }
                        evolv.forEach(p => {
                            let tempID2 = p.species.url.split('/')[6];
                            temp[stage].push({ name: p.species.name, id: tempID2, img: getImg(tempID2), this: (currPoke.toLowerCase() === p.species.name), })
                            checkEvoBranch(p.evolves_to, stage + 1);
                        })
                    }
                }
                checkEvoBranch(evo.data.chain.evolves_to);
                setEvolution(temp);
            }).catch(err => {
                console.log(err);
            });
    }
    function displayEvoChain() {
        console.log(evolution);
        return (
            <Col>
                {evolution.length <= 1 ?
                    <div>
                        {evolution[0].name}
                        <img src={evolution[0].img} />
                    </div> :
                    <Row className="justify-content-center" id="evo-container">
                        <Col xs={2} className="d-flex flex-column justify-content-center">
                            <div>
                                <div><img width="100%" src={evolution[0].img} /></div>
                                <div className="text-center evo-caption">{chkFF(evolution[0].name)}</div>
                            </div>
                        </Col>
                        {evolution.slice(1).map((evo, index) => (
                            <>
                                {evo.length > 1 ?
                                    <>
                                        <Col xs={'auto'} className="d-flex flex-column justify-content-around">
                                            <div>
                                                <div className="h1">
                                                    <FontAwesomeIcon icon={faLongArrowAltRight} />
                                                </div>
                                                <div>Item</div>
                                            </div>
                                            <div>
                                                <div className="h1">
                                                    <FontAwesomeIcon icon={faLongArrowAltRight} />
                                                </div>
                                                <div>Item</div>
                                            </div>
                                        </Col>
                                        <Col xs={2}>
                                            {evo.map((el, index) => (
                                                <div className={`evo-${index}-row`}>
                                                    <div><img width="100%" src={el.img} /></div>
                                                    <div className="text-center evo-caption">{chkFF(el.name)}</div>
                                                </div>
                                            ))}
                                        </Col>
                                    </> :
                                    <>
                                        <Col xs={'auto'} className="d-flex flex-column justify-content-center">
                                            <div className="h1">
                                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                                            </div>
                                            <div>Item</div>
                                        </Col>
                                        <Col xs={2} className="border">
                                            <div><img width="100%" src={evo[0].img} /></div>
                                            <div className="text-center evo-caption">{chkFF(evo[0].name)}</div>
                                        </Col>
                                    </>
                                }
                            </>
                        ))}
                    </Row>
                }
            </Col>
        )
    }
    useEffect(() => {
        getEvoChain();
    }, [chain])
    return (
        <Col className="mt-2">
            <hr />
            <h3>Evolution</h3>
            <Row className="mx-auto">
                {displayEvoChain()}
            </Row>
        </Col>
    )
}

export default Evolution
