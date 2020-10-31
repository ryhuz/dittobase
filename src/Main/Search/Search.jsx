import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Row, Col, Card } from 'react-bootstrap'
import Loading from './Loading';
import SearchBox from './SearchBox/SearchBox';

function Search() {
    const [searchParam, setSearchParam] = useState({
        attr: {
            name: "", type: "All", gen: "All",
        },
        index: {
            indexStart: "", indexEnd: "",
        },
    });
    const [pokeSearch, setPokeSearch] = useState([]);
    const [loading, setLoad] = useState(false);
    let limit = 3;
    let cancel = '';

    function change(e) {
        if (e.target.name.includes('index')) {
            setSearchParam({ attr: { name: "", type: "All", gen: "All", }, index: { ...searchParam.index, [e.target.name]: e.target.value } });
        } else {
            setSearchParam({ attr: { ...searchParam.attr, [e.target.name]: e.target.value, }, index: { indexStart: "", indexEnd: "", } });
        }
        setLoad(true);
    }

    function getSearchResults() {
        let axios = require('axios');
        let getType = searchParam.attr.type;
        switch (searchParam.attr.type) {
            case 'Normal':
                getType = 'type/1/'
                break;
            case 'Fighting':
                getType = 'type/2/'
                break;
            case 'Flying':
                getType = 'type/3/'
                break;
            case 'Poison':
                getType = 'type/4/'
                break;
            case 'Ground':
                getType = 'type/5/'
                break;
            case 'Rock':
                getType = 'type/6/'
                break;
            case 'Bug':
                getType = 'type/7/'
                break;
            case 'Ghost':
                getType = 'type/8/'
                break;
            case 'Steel':
                getType = 'type/9/'
                break;
            case 'Fire':
                getType = 'type/10/'
                break;
            case 'Water':
                getType = 'type/11/'
                break;
            case 'Grass':
                getType = 'type/12/'
                break;
            case 'Electric':
                getType = 'type/13/'
                break;
            case 'Psychic':
                getType = 'type/14/'
                break;
            case 'Ice':
                getType = 'type/15/'
                break;
            case 'Dragon':
                getType = 'type/16/'
                break;
            case 'Dark':
                getType = 'type/17/'
                break;
            case 'Fairy':
                getType = 'type/18/'
                break;
            case 'Unknown':
                getType = 'type/10001/'
                break;
            case 'Shadow':
                getType = 'type/10002/'
                break;
            default:
                getType = ''
        }

        if (cancel) {
            cancel.cancel();
        }
        cancel = axios.CancelToken.source();

        axios.get(`https://pokeapi.co/api/v2/${getType ? getType : 'pokemon'}?limit=${limit}`, {
            cancelToken: cancel.token
        }).then(result => {
            setPokeSearch(getType ? result.data.pokemon : result.data.results);
            setLoad(false);
        }).catch(err => {
            setLoad(false);
            console.log("Error at getting serach results");
        })

        /* function resultURL() {
            let temp = [];
            for (let i = 0; i < pokeResults.length; i++) {
                let getURL = axios.get(pokeResults[i].url);
                getURL.then(r => {
                    temp.push({
                        id: r.data.id,
                        name: r.data.name,
                        img: r.data.sprites.other['official-artwork'].front_default,
                    })
                })
            }
            setPokeURLs(temp);
            console.log(pokeURLs);
        } */
    }

    function renderSearch() {
        if (pokeSearch.length) {
            let data = [];
            if (pokeSearch[0].pokemon) {
                pokeSearch.forEach(x => {
                    data.push(x.pokemon);
                })
            } else {
                data = pokeSearch;
            }
            return (<>
                <Container>
                    <Row >
                        {data.map((el, index) => (
                            searchParam.attr.name ?
                                (el.name.includes(searchParam.attr.name.toLowerCase()) ?
                                    <Col md={3} className="p-3" key={index}>
                                        <Card>
                                            {el.name}-{el.url}
                                        </Card>
                                    </Col> : ""
                                ) :
                                <Col md={3} className="p-3" key={index}>
                                    <Card>
                                        {el.name}-{el.url}
                                    </Card>
                                </Col>
                        ))}
                    </Row>
                </Container>
            </>)
        }
    }

    useEffect(() => {
        getSearchResults(searchParam);
    }, [searchParam])

    return (
        <div>
            <Jumbotron fluid className="d-flex align-items-center text-center search">
                <Container className="banner-text rounded-lg p-3">
                    <h1>Search Pokémon</h1>
                </Container>
            </Jumbotron>
            <Container className="h3 mb-4">
                Search
            </Container>
            <SearchBox change={change} />
            {!loading && renderSearch()}
            {loading && <Loading />}

        </div>
    )
}

export default Search