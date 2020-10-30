import React, { useState } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import SearchBox from './SearchBox/SearchBox';
import SearchResults from './Result/SearchResults'

function Search() {
    const [searchParam, setSearchParam] = useState({ 
        attr: {
            name: "", type: "All", gen: "All",
        },
        index: {
            indexStart: "", indexEnd: "",
        }
    });

    function change(e) {
        if(e.target.name.includes('index')){
            setSearchParam({attr:{ name: "", type: "All", gen: "All", }, index: {...searchParam.index, [e.target.name]: e.target.value}});
        }else{
            setSearchParam({ attr: {...searchParam.attr, [e.target.name]: e.target.value,}, index:{ indexStart: "", indexEnd: "", } });
        }
    }
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
            <SearchBox change={change}/>
            <SearchResults searchParam={searchParam}/>
        </div>
    )
}

export default Search
