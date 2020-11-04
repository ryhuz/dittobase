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
        function ifNotEevee() {
            return (
                <Col>
                    {evolution.length <= 1 ?
                        <Row className="justify-content-center" id="evo-container">
                            <Col xs={2} className="d-flex flex-column justify-content-center">                    {/* if no evolution */}
                                <div><img src={evolution[0].img} width="100%" /></div>                            {/*       |         */}
                                <div className="text-center evo-caption">{chkFF(evolution[0].name)}</div>
                            </Col>                                                                                {/*       |         */}
                        </Row> :
                        <Row className="justify-content-center" id="evo-container">
                            <Col xs={2} className="d-flex flex-column justify-content-center">                      {/* first stage of evolution */}
                                <div className={`${evolution[0].this && 'border border-secondary'}`}>               {/*             |            */}
                                    <div><img width="100%" src={evolution[0].img} /></div>                          {/*             |            */}
                                    <div className="text-center evo-caption">{chkFF(evolution[0].name)}</div>       {/*             |            */}
                                </div>                                                                              {/*             |            */}
                            </Col>
                            {evolution.slice(1).map((evo, index) => (                                               /* Excluding the first stage  */
                                <>
                                    {evo.length > 1 ?
                                        <>                                  {/* ----------------------------------------------------- use d-none to do the scaling */}
                                            <Col xs={'auto'} className="d-flex flex-column justify-content-around"> {/* For more than 1 branch of evo */}
                                                {evo.map((el, index) => (                                           /*                  |               */
                                                    <div>                                                           {/*                 |               */}
                                                        <div className="h1">                                        {/*                 |               */}
                                                            <FontAwesomeIcon icon={faLongArrowAltRight} />          {/*         Printing arrows         */}
                                                        </div>                                                      {/*                 |               */}
                                                        <div>Item</div>                                             {/*                 |               */}
                                                    </div>                                                           /*                 |               */
                                                ))}
                                            </Col>                          {/* ----------------------------------------------------- use d-none to do the scaling */}
                                            <Col xs={2} className="">                                               {/*         Printing branches         */}
                                                {evo.map((el, index) => (                                            /*                  |               */
                                                    <div className={`evo-${index}-row ${el.this && 'border border-secondary'}`}>
                                                        <div><img width="100%" src={el.img} /></div>                {/*                 |               */}
                                                        <div className="text-center evo-caption">{chkFF(el.name)}</div>
                                                    </div>                                                           /*                 |               */
                                                ))}
                                            </Col>
                                        </> :
                                        <>
                                            <Col xs={'auto'} className="d-flex flex-column justify-content-center"> {/*                 |               */}
                                                <div className="h1">                                                {/*                 |               */}
                                                    <FontAwesomeIcon icon={faLongArrowAltRight} />                  {/*         Single bracnh of evo    */}
                                                </div>                                                              {/*                 |               */}
                                                <div>Item</div>                                                     {/*                 |               */}
                                            </Col>                                                                  {/*                 |               */}
                                            <Col xs={2} className="d-flex flex-column justify-content-center">
                                                <div className={`${evo[0].this && 'border border-secondary'}`}>
                                                    <div><img width="100%" src={evo[0].img} /></div>
                                                    <div className="text-center evo-caption">{chkFF(evo[0].name)}</div>
                                                </div>
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
        function ifEevee() {
            return (
                <Col>
                    {evolution.length <= 1 ?
                        <div>                                                                                       {/* if no evolution */}
                            {evolution[0].name}                                                                     {/*       |         */}
                            <img src={evolution[0].img} />                                                          {/*       |         */}
                        </div> :
                        <Row className="justify-content-center" id="evo-container">
                            <Col xs={2} className="d-flex flex-column justify-content-center">                      {/* first stage of evolution */}
                                <div className={`${evolution[0].this && 'border border-secondary'}`}>               {/*             |            */}
                                    <div><img width="100%" src={evolution[0].img} /></div>                          {/*             |            */}
                                    <div className="text-center evo-caption">{chkFF(evolution[0].name)}</div>       {/*             |            */}
                                </div>                                                                              {/*             |            */}
                            </Col>
                            {evolution.slice(1).map((evo, index) => (                                               /* Excluding the first stage  */
                                <>
                                    {evo.length > 1 ?
                                        <>                                  {/* ----------------------------------------------------- use d-none to do the scaling */}
                                            <Col xs={'auto'} className="d-flex flex-column justify-content-around"> {/* For more than 1 branch of evo */}
                                                {evo.map((el, index) => (                                           /*                  |               */
                                                    <div>                                                           {/*                 |               */}
                                                        <div className="h1">                                        {/*                 |               */}
                                                            <FontAwesomeIcon icon={faLongArrowAltRight} />          {/*         Printing arrows         */}
                                                        </div>                                                      {/*                 |               */}
                                                        <div>Item</div>                                             {/*                 |               */}
                                                    </div>                                                           /*                 |               */
                                                ))}
                                            </Col>                          {/* ----------------------------------------------------- use d-none to do the scaling */}
                                            <Col xs={2} className="">                                               {/*         Printing branches         */}
                                                {evo.map((el, index) => (                                            /*                  |               */
                                                    <div className={`evo-${index}-row ${el.this && 'border border-secondary'}`}>
                                                        <div><img width="100%" src={el.img} /></div>                {/*                 |               */}
                                                        <div className="text-center evo-caption">{chkFF(el.name)}</div>
                                                    </div>                                                           /*                 |               */
                                                ))}
                                            </Col>
                                        </> :
                                        <>
                                            <Col xs={'auto'} className="d-flex flex-column justify-content-center"> {/*                 |               */}
                                                <div className="h1">                                                {/*                 |               */}
                                                    <FontAwesomeIcon icon={faLongArrowAltRight} />                  {/*         Single bracnh of evo    */}
                                                </div>                                                              {/*                 |               */}
                                                <div>Item</div>                                                     {/*                 |               */}
                                            </Col>                                                                  {/*                 |               */}
                                            <Col xs={2} className="d-flex flex-column justify-content-center">
                                                <div className={`${evo[0].this && 'border border-secondary'}`}>
                                                    <div><img width="100%" src={evo[0].img} /></div>
                                                    <div className="text-center evo-caption">{chkFF(evo[0].name)}</div>
                                                </div>
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

        return (
            <>
                {currPoke.toLowerCase() === 'eevee' ? ifEevee() : ifNotEevee()}
            </>
        )
    }
    useEffect(() => {
        getEvoChain();
    }, [currPoke])
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
