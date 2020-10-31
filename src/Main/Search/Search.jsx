import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Row, Col, Card } from 'react-bootstrap'
import Loading from './Loading';
import CardData from './Result/CardData';
import SearchBox from './SearchBox/SearchBox';
import debounce from "lodash.debounce";

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
    const [loadLimit, setLoadLimit] = useState({
        error: false,
        limit: 20,
    });
    let loadingMore = false;
    let cancel = '';

    function change(e) {
        if (e.target.name.includes('index')) {
<<<<<<< HEAD
            setSearchParam({ attr: { name: "", type: "All", gen: "All", }, index: { ...searchParam.index, [e.target.name]: e.target.value } });
=======
            if(isNaN(e.target.value) || Number(e.target.value) <=0 ){
                e.target.value = "";
            }else{
                setSearchParam({ attr: { name: "", type: "All", gen: "All", }, index: { ...searchParam.index, [e.target.name]: e.target.value } });
            }
>>>>>>> infinite-scroll
        } else {
            setSearchParam({ attr: { ...searchParam.attr, [e.target.name]: e.target.value, }, index: { indexStart: "", indexEnd: "", } });
        }
        setLoad(true);
        setLoadLimit({ ...loadLimit, limit: 20, });
    }
    let debounceChange = debounce((change), 600);

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

        axios.get(`https://pokeapi.co/api/v2/${getType ? getType : 'pokemon'}?limit=898`, {
            cancelToken: cancel.token
        }).then(result => {
            setPokeSearch(getType ? result.data.pokemon : result.data.results);
            setLoad(false);
        }).catch(err => {
            setLoad(false);
            setLoadLimit({ ...loadLimit, error: true });
            alert("Error at getting search results");
            console.log('error = ', err);
        })
    }

    window.onscroll = debounce(() => {
<<<<<<< HEAD
        if (loadLimit.error || loadLimit.isLoading || loadLimit>pokeSearch.length) return;
=======
        if (loadLimit.error || loadingMore || loadLimit>pokeSearch.length) return;
>>>>>>> infinite-scroll
        if (window.innerHeight + document.documentElement.scrollTop === document.body.scrollHeight) {
            setLoadLimit({ ...loadLimit, limit: loadLimit.limit+20, });
            loadingMore = true;
        }
    }, 500);

    function renderSearch() {
        let data = [];
        if (!loadLimit.error) {
            let pLimit = pokeSearch.length
            let count = 0;
            let curr = 0;
<<<<<<< HEAD
=======
            if (searchParam.index.indexStart){
                curr = Number(searchParam.index.indexStart) - 1;
                if(searchParam.index.indexEnd && Number(searchParam.index.indexEnd)>Number(searchParam.index.indexStart)){
                    pLimit = Number(searchParam.index.indexEnd)
                }
            }
>>>>>>> infinite-scroll
            while (count < loadLimit.limit && count < pokeSearch.length && curr < pLimit) {
                if (searchParam.attr.name === '' && searchParam.attr.gen === 'All') {
                    if (pokeSearch[curr].pokemon) {
                        data.push(pokeSearch[curr].pokemon);
                    } else {
                        data.push(pokeSearch[curr]);
                    }
                    count++;
                } else {
                    let chkName = searchParam.attr.name === '' ? false : true;
                    let chkGen = searchParam.attr.gen === 'All' ? false : true;
                    let namePass = false;
                    let genPass = false;
                    if (chkGen) {
                        let tempGen = "";
                        let x = (pokeSearch[curr].pokemon ? pokeSearch[curr].pokemon.url.split('/')[6] : pokeSearch[curr].url.split('/')[6]);
                        switch (true) {
                            case (x <= 151):
                                tempGen = 'I';
                                break;
                            case (x <= 251):
                                tempGen = 'II';
                                break;
                            case (x <= 386):
                                tempGen = 'III';
                                break;
                            case (x <= 493):
                                tempGen = 'IV';
                                break;
                            case (x <= 649):
                                tempGen = 'V';
                                break;
                            case (x <= 721):
                                tempGen = 'VI';
                                break;
                            case (x <= 809):
                                tempGen = 'VII';
                                break;
                            case (x <= 898):
                                tempGen = 'VII';
                                break;
                            default:
                                tempGen = 'Others';
                                break;
                        }
                        if (searchParam.attr.gen === tempGen) {
                            genPass = true;
                        }
                    }
                    if (chkName) {
                        let x = (pokeSearch[curr].pokemon ? pokeSearch[curr].pokemon.name : pokeSearch[curr].name);
                        namePass = x.includes(searchParam.attr.name);
                    }
                    if (chkName === namePass && chkGen === genPass) {
                        if (pokeSearch[curr].pokemon) {
                            data.push(pokeSearch[curr].pokemon);
                        } else {
                            data.push(pokeSearch[curr]);
                        }
                        count++;
                    }
                }
                curr++
            }
        }
        loadingMore = false;
        return (<>
            <Container className='mb-5'>
                <Row >
                    {data.map((el, index) => (
                        <CardData key={index} pokeData={el} />
                    ))}
                </Row>
            </Container>
        </>)

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
            <SearchBox change={debounceChange} />
            {!loading && renderSearch()}
            {loading && <Loading />}
            {loadingMore && <Loading />}
        </div>
    )
}

export default Search